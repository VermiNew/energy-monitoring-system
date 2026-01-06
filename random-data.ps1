$API_BASE = "http://localhost:3000/api"

# Enable sources first
@(0, 1, 2, 3) | ForEach-Object {
    $node = $_
    $response = Invoke-WebRequest -Uri "$API_BASE/sources" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"node`": $node, `"status`": true}" `
        -ErrorAction SilentlyContinue
    Write-Host "Enabled source $node"
}

# Continuous data update loop
while ($true) {
    # Update solar power (node 0)
    $solarPower = Get-Random -Minimum 100 -Maximum 10000
    Invoke-WebRequest -Uri "$API_BASE/sources" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"node`": 0, `"power`": $solarPower}" `
        -ErrorAction SilentlyContinue | Out-Null

    # Update grid power (node 1)
    $gridPower = Get-Random -Minimum 50 -Maximum 5000
    Invoke-WebRequest -Uri "$API_BASE/sources" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"node`": 1, `"power`": $gridPower}" `
        -ErrorAction SilentlyContinue | Out-Null

    # Update car power (node 2)
    $carPower = Get-Random -Minimum 0 -Maximum 3000
    Invoke-WebRequest -Uri "$API_BASE/sources" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"node`": 2, `"power`": $carPower}" `
        -ErrorAction SilentlyContinue | Out-Null

    # Update wind power (node 3)
    $windPower = Get-Random -Minimum 200 -Maximum 8000
    Invoke-WebRequest -Uri "$API_BASE/sources" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"node`": 3, `"power`": $windPower}" `
        -ErrorAction SilentlyContinue | Out-Null

    # Update battery level
    $batteryLevel = Get-Random -Minimum 20 -Maximum 95
    Invoke-WebRequest -Uri "$API_BASE/battery" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"level`": $batteryLevel}" `
        -ErrorAction SilentlyContinue | Out-Null

    # Update AC output
    $acEnabled = if ((Get-Random -Minimum 0 -Maximum 100) -gt 50) { "true" } else { "false" }
    $acPower = Get-Random -Minimum 100 -Maximum 800
    Invoke-WebRequest -Uri "$API_BASE/output" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"acEnabled`": $acEnabled, `"acPower`": $acPower}" `
        -ErrorAction SilentlyContinue | Out-Null

    # Update DC output
    $dcEnabled = if ((Get-Random -Minimum 0 -Maximum 100) -gt 50) { "true" } else { "false" }
    $dcPower = Get-Random -Minimum 50 -Maximum 600
    Invoke-WebRequest -Uri "$API_BASE/output" `
        -Method PUT `
        -ContentType "application/json" `
        -Body "{`"dcEnabled`": $dcEnabled, `"dcPower`": $dcPower}" `
        -ErrorAction SilentlyContinue | Out-Null

    Write-Host "Updated - Solar: $solarPower W, Grid: $gridPower W, Car: $carPower W, Wind: $windPower W, Battery: $batteryLevel%, AC: $acEnabled ($acPower W), DC: $dcEnabled ($dcPower W)"
    
    Start-Sleep -Milliseconds 100
}
