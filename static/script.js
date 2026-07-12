document.getElementById('download-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const url = document.getElementById('url').value;
    const format = document.getElementById('format').value;
    const statusText = document.getElementById('status');
    const btn = document.getElementById('download-btn');
    
    statusText.innerText = "⏳ Kaychargé... tsna chwiya (ghadi yt3tl 3la 7sab kobr l'video w la qualité).";
    btn.disabled = true;

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url, format })
        });

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error || 'Erreur f download');
        }

        // Njibo smiyt l'fichier ila 9derna, wla nsamiwh default
        let filename = `download.${format}`;
        const disposition = response.headers.get('Content-Disposition');
        if (disposition && disposition.indexOf('attachment') !== -1) {
            const matches = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/.exec(disposition);
            if (matches != null && matches[1]) { 
                filename = matches[1].replace(/['"]/g, '');
            }
        }

        // Ndeclenchiw téléchargement f jhaz dyal user
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(downloadUrl);
        
        statusText.innerText = "✅ Download salé!";
    } catch (err) {
        statusText.innerText = "❌ Mochkil: " + err.message;
    } finally {
        btn.disabled = false;
    }
});
