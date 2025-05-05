import { supabase } from './supabase-config.js';

// Globale Rangliste
let leaderboard = [];

// Lade die Rangliste beim Start
async function loadLeaderboard() {
    try {
        const { data, error } = await supabase
            .from('leaderboard')
            .select('*')
            .order('score', { ascending: false })
            .limit(10);

        if (error) throw error;
        leaderboard = data || [];
    } catch (error) {
        console.error('Fehler beim Laden der Rangliste:', error);
        leaderboard = [];
    }
}

// Funktionen zum Verwalten der Rangliste
async function addToLeaderboard(entry) {
    try {
        // Alten Eintrag des Spielers entfernen, falls vorhanden
        const { error: deleteError } = await supabase
            .from('leaderboard')
            .delete()
            .eq('playerId', entry.playerId);

        if (deleteError) throw deleteError;

        // Neuen Eintrag hinzufügen
        const { error: insertError } = await supabase
            .from('leaderboard')
            .insert([entry]);

        if (insertError) throw insertError;

        // Lokale Rangliste aktualisieren
        leaderboard = leaderboard.filter(e => e.playerId !== entry.playerId);
        leaderboard.push(entry);
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 10);

    } catch (error) {
        console.error('Fehler beim Speichern der Rangliste:', error);
    }
}

function getLeaderboard() {
    return leaderboard;
}

// Lade die Rangliste beim Start
loadLeaderboard();

// Exportiere die Funktionen
export { addToLeaderboard, getLeaderboard }; 