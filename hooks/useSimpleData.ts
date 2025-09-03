import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// La taille de chaque "page" de données que nous demandons
const PAGE_SIZE = 1000;

export const useSimpleData = (tableName: string) => {
  const [data, setData] = useState<any[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);
      let allData: any[] = [];
      let page = 0;
      let moreData = true;

      try {
        // Boucle pour récupérer les données page par page
        while (moreData) {
          const from = page * PAGE_SIZE;
          const to = from + PAGE_SIZE - 1;

          const { data: pageData, error: pageError } = await supabase
            .from(tableName)
            .select('*')
            .range(from, to); // C'est la commande magique pour la pagination

          if (pageError) {
            throw pageError; // Si une erreur se produit, on arrête tout
          }

          if (pageData && pageData.length > 0) {
            allData = [...allData, ...pageData];
          }

          // Si la page contient moins de 1000 lignes, c'est la dernière page
          if (!pageData || pageData.length < PAGE_SIZE) {
            moreData = false;
          }

          page++;
        }
        
        setData(allData);

      } catch (fetchError: any) {
        console.error(`Error fetching all data from ${tableName}:`, fetchError);
        setError(fetchError.message);
      } finally {
        setLoading(false);
      }
    };

    if (tableName) {
      fetchAllData();
    }
  }, [tableName]);

  return { data, loading, error };
};

