@echo off
echo Starting Expense Tracker Application...

echo.
echo Starting Backend Server...
start cmd /k "cd backend && npm run dev"

timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start cmd /k "cd abc\expense_app && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
pause