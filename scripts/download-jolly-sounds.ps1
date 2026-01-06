# PowerShell script to download Jolly Phonics audio files
# Base URL: https://www.jollykingdom.com/lettersounds/sound/

$baseUrl = "https://www.jollykingdom.com/lettersounds/sound/"
$outputDir = "public/sounds"

# Create output directory if it doesn't exist
if (-not (Test-Path $outputDir)) {
    New-Item -ItemType Directory -Path $outputDir -Force
}

# List of all Jolly Phonics sound files
$soundFiles = @(
    "s.mp3", "a.mp3", "t.mp3", "i.mp3", "p.mp3", "n.mp3",
    "ck.mp3", "e.mp3", "h.mp3", "r.mp3", "m.mp3", "d.mp3",
    "g.mp3", "o.mp3", "u.mp3", "l.mp3", "f.mp3", "b.mp3",
    "ai.mp3", "j.mp3", "oa.mp3", "ie.mp3", "ee.mp3", "or.mp3",
    "z.mp3", "w.mp3", "ng.mp3", "v.mp3", "moon.mp3", "book.mp3",
    "y.mp3", "x.mp3", "ch.mp3", "sh.mp3", "three.mp3", "this.mp3",
    "qu.mp3", "ou.mp3", "oi.mp3", "ue.mp3", "er.mp3", "ar.mp3"
)

Write-Host "Downloading Jolly Phonics audio files..." -ForegroundColor Green

foreach ($file in $soundFiles) {
    $url = $baseUrl + $file
    $outputPath = Join-Path $outputDir $file
    
    Write-Host "Downloading: $file" -ForegroundColor Yellow
    
    try {
        Invoke-WebRequest -Uri $url -OutFile $outputPath -ErrorAction Stop
        Write-Host "  Successfully downloaded: $file" -ForegroundColor Green
    }
    catch {
        Write-Host "  Failed to download: $file - $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Download complete!" -ForegroundColor Green
Write-Host "Files saved to: $outputDir" -ForegroundColor Cyan
