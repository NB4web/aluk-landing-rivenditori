$ftpRequest = [System.Net.FtpWebRequest]::Create('ftp://86.107.36.49/')
$ftpRequest.Credentials = New-Object System.Net.NetworkCredential('mpartnez', 'WekeetPagfudyiarf5')
$ftpRequest.Method = [System.Net.WebRequestMethods+Ftp]::ListDirectory
try {
    $response = $ftpRequest.GetResponse()
    Write-Output "TEST FTP: CONNESSIONE RIUSCITA!"
} catch {
    Write-Output "TEST FTP FALLITO: $($_.Exception.Message)"
}
