import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient'; // Import the client
import { HourlyData, ProcessedData, AnnualMetrics } from '../types';

// La fonction principale qui va chercher et traite les données de Supabase
async function fetchAndProcessData(plantName: string | null): Promise<ProcessedData | null> {
  if (!plantName) return null;

  console.log(`Fetching data for: ${plantName}`);

  // 1. Trouver l'ID de la dernière simulation pour la plante sélectionnée
  const { data: latestSimulation, error: simError } = await supabase
    .from('simulations')
    .select('id, peak_temp_open_field, peak_temp_under_panels, water_savings_percent, dli_open_field, dli_under_panels, et_open_field_mm, et_under_panels_mm')
    .eq('crop_name', plantName)
    .order('simulation_timestamp', { ascending: false }) // Utiliser simulation_timestamp pour être plus précis
    .limit(1)
    .single();

  if (simError || !latestSimulation) {
    console.error('Error fetching latest simulation:', simError);
    throw new Error(`No simulation data found for ${plantName}.`);
  }

  const simulationId = latestSimulation.id;
  console.log(`Latest simulation ID for ${plantName} is: ${simulationId}`);
  
  // 2. Récupérer toutes les données horaires pour cette simulation
  const { data: hourlyData, error: hourlyError } = await supabase
    .from('donnees_horaires')
    .select('timestamp, ghi_open_field, ghi_agrivoltaic, temp_open_field, temp_agrivoltaic, wind_speed, relative_humidity')
    .eq('simulation_id', simulationId)
    .order('timestamp', { ascending: true });

  if (hourlyError || !hourlyData) {
    console.error('Error fetching hourly data:', hourlyError);
    throw new Error(`Could not fetch hourly data for simulation ID ${simulationId}.`);
  }

  // Mapper les données de Supabase pour correspondre à notre type `HourlyData`
  const formattedData: HourlyData[] = hourlyData.map((row: any) => ({
    Time: row.timestamp,
    GHI_Open_Field: row.ghi_open_field,
    GHI_Agrivoltaic: row.ghi_agrivoltaic,
    Temperature_Open_Field: row.temp_open_field,
    Temperature_Agrivoltaic: row.temp_agrivoltaic,
    Wind_Speed: row.wind_speed,
    Relative_Humidity: row.relative_humidity,
  }));

  // [FIX] S'assurer que les métriques ne sont jamais null. Si elles le sont, on utilise 0.
  const et_open = latestSimulation.et_open_field_mm ?? 0;
  const et_agri = latestSimulation.et_under_panels_mm ?? 0;

  const annualMetrics: AnnualMetrics = {
    peak_temp_open: latestSimulation.peak_temp_open_field ?? 0,
    peak_temp_agri: latestSimulation.peak_temp_under_panels ?? 0,
    water_savings_percentage: latestSimulation.water_savings_percent ?? 0,
    total_water_saved_mm: et_open - et_agri,
    dli_open: latestSimulation.dli_open_field ?? 0,
    dli_agri: latestSimulation.dli_under_panels ?? 0,
  };

  return { hourlyData: formattedData, annualMetrics };
}

// Le custom hook React
export const useAgrivoltaicData = (plantName: string | null) => {
  const [data, setData] = useState<ProcessedData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!plantName) {
      setData(null); // S'assurer que les anciennes données sont effacées si aucune plante n'est sélectionnée
      setLoading(false);
      return;
    }
    
    setLoading(true);
    setError(null);
    setData(null);

    fetchAndProcessData(plantName)
      .then(processedData => {
        setData(processedData);
      })
      .catch(err => {
        setError(err.message);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

  }, [plantName]);

  return { data, loading, error };
};

