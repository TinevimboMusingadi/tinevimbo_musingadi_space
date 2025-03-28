import { ProjectContent } from '@/types/project';
import { FaWater } from 'react-icons/fa';
import React from 'react';

// Static list of projects
const projects: ProjectContent[] = [
  {
    id: 'flood-device',
    title: 'Last Minute Flood Forecasting Device',
    description: 'Invented a proof of concept flash flood forecasting device that used embedded systems and AI to predict flash flooding.',
    category: 'hybrid-engineering',
    icon: React.createElement(FaWater, { className: "text-2xl" }),
    image: '/content/projects/flood-device/cover.jpg',
    content: '# Project Overview\n\nThis innovative project combines embedded systems and artificial intelligence to create a real-time flash flood forecasting device. The system uses a network of sensors to collect environmental data and processes it through a machine learning model to predict potential flash floods.\n\n## Key Features\n- Real-time flood prediction with 85% accuracy\n- 30-minute early warning window\n- Solar-powered operation\n- Wireless sensor network\n- AI-powered prediction model\n\n## Technical Implementation\n\nThe system is built with a modular architecture:\n1. Data Collection Layer\n2. Processing Layer\n3. Prediction Layer\n4. Communication Layer\n\n## AI Model\nWe developed a custom TensorFlow model that processes:\n- Historical weather data\n- Real-time sensor readings\n- Topographical information\n\n## Results & Impact\n\nThe device successfully predicted flash floods with 85% accuracy within a 30-minute window, providing crucial early warning to communities.\n\n## Performance Metrics\n- 85% prediction accuracy\n- 30-minute warning window\n- 24/7 operation capability\n- Low power consumption',
    skills: [
      { name: 'Python', iconName: 'SiPython' },
      { name: 'TensorFlow', iconName: 'SiTensorflow' }
    ],
    details: {
      summary: 'An innovative device that combines embedded systems and machine learning to provide early warning for flash floods.',
      keyObjectives: [
        'Develop real-time flood prediction system',
        'Create embedded AI solution',
        'Implement low-cost sensor network'
      ],
      challenges: [
        'Limited computational resources',
        'Real-time processing requirements',
        'Environmental durability'
      ],
      learnings: [
        'Embedded ML optimization',
        'Sensor data processing',
        'Weather pattern analysis'
      ]
    },
    links: {
      github: 'https://github.com/yourusername/flood-forecast',
      youtube: 'https://youtube.com/watch?v=...',
      documentation: 'https://docs.google.com/...'
    },
    galleryImages: ['/content/projects/flood-device/gallery/cover.jpg']
  }
];

export function getProjects(): ProjectContent[] {
  return projects;
}

export function getProjectById(id: string): ProjectContent | undefined {
  return projects.find(project => project.id === id);
} 