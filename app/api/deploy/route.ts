import { NextResponse } from "next/server";

const VERCEL_TOKEN = process.env.VERCEL_TOKEN; // Your Vercel API token
const VERCEL_PROJECT_NAME = "food-template"; // The name of the template project
const VERCEL_TEAM_ID = "team_yqERLqpkfnPPh1C0kmzXI1mY"; // Your actual Vercel team ID

export async function POST() {
  try {
    // Vercel API endpoint to create a deployment
    const vercelDeployUrl = `https://api.vercel.com/v13/deployments?teamId=${VERCEL_TEAM_ID}`;

    const deploymentResponse = await fetch(vercelDeployUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${VERCEL_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: VERCEL_PROJECT_NAME,
        project: VERCEL_PROJECT_NAME,
        gitSource: {
          type: "github",
          repoId: "865376672", // Correct repo ID for food_template_project
          ref: "main", // Branch to deploy
        },
      }),
    });

    const deploymentData = await deploymentResponse.json();

    // Log the full response to see what's returned
    console.log("Deployment Data: ", deploymentData);

    if (deploymentData.id && deploymentData.url) {
      // Return the deployment info including the project ID and URL
      return NextResponse.json({
        message: "Deployment started",
        projectId: deploymentData.id,
        url: deploymentData.url,
      });
    } else {
      return NextResponse.json(
        { message: "Deployment started but missing deployment details" },
        { status: 200 }
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: "Deployment failed", error: error.message },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Deployment failed due to an unknown error" },
        { status: 500 }
      );
    }
  }
}
