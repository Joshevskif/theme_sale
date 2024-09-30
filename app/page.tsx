'use client'; // Since we're handling client-side actions
import { useState } from 'react';
import styles from './page.module.css';

export default function Home() {
  const [projectId, setProjectId] = useState('');
  const [deployUrl, setDeployUrl] = useState('');

  const handleBuyTheme = async () => {
    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        setProjectId(data.projectId);
        setDeployUrl(data.url);
      } else {
        console.error('Deployment failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.page}>
      <button onClick={handleBuyTheme}>Buy Theme</button>

      {projectId && (
        <div>
          <p>Deployment started with ID: {projectId}</p>
          <p>Your website is available at: <a href={`https://${deployUrl}`} target="_blank">{deployUrl}</a></p>
        </div>
      )}
    </div>
  );
}
