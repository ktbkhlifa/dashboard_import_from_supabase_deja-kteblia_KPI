import { AnnualMetrics } from '../types';

interface Comment {
  title: string;
  text: string;
  type: 'good' | 'warning' | 'bad';
}

// On ajoute le mot-clé "export" ici pour rendre la fonction utilisable
// dans d'autres fichiers comme App.tsx.
export function generateComments(metrics: AnnualMetrics): Comment[] {
  const comments: Comment[] = [];

  // Water Savings Comment
  if (metrics.water_savings_percentage > 20) {
    comments.push({
      title: "Excellent Water Conservation",
      text: `A ${metrics.water_savings_percentage.toFixed(1)}% annual water saving is significant, strengthening the farm's resilience to drought.`,
      type: 'good',
    });
  } else if (metrics.water_savings_percentage > 10) {
    comments.push({
      title: "Good Water Conservation",
      text: `A saving of ${metrics.water_savings_percentage.toFixed(1)}% is a positive result, contributing to sustainable water management.`,
      type: 'good',
    });
  } else {
     comments.push({
      title: "Modest Water Savings",
      text: `At ${metrics.water_savings_percentage.toFixed(1)}%, the water saving is present but could be optimized further.`,
      type: 'warning',
    });
  }

  // Temperature Comment
  const tempReduction = metrics.peak_temp_open - metrics.peak_temp_agri;
  if (tempReduction > 2) {
     comments.push({
      title: "Significant Heat Stress Reduction",
      text: `Reducing peak summer temperature by ${tempReduction.toFixed(1)}°C provides substantial protection for crops against heat damage.`,
      type: 'good',
    });
  } else {
     comments.push({
      title: "Moderate Temperature Regulation",
      text: `A temperature reduction of ${tempReduction.toFixed(1)}°C offers some protection, though crops might still experience heat stress on the hottest days.`,
      type: 'warning',
    });
  }

  // DLI Comment
  if (metrics.dli_agri < 10) {
     comments.push({
      title: "Potential Light Limitation",
      text: `The DLI of ${metrics.dli_agri.toFixed(1)} is on the lower side. This could be a limiting factor for light-demanding crops.`,
      type: 'bad',
    });
  } else {
     comments.push({
      title: "Sufficient Light Levels",
      text: `A DLI of ${metrics.dli_agri.toFixed(1)} under the panels indicates sufficient light for many types of crops.`,
      type: 'good',
    });
  }

  return comments;
}
