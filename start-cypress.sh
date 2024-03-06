cd backend && npm run dev &
backend_pid=$! 

cd frontend && npm run dev &
frontend_pid=$!

# Run Cypress, then wait for it to finish
npx cypress run & 
cypress_pid=$! # Store the PID of the Cypress process

wait $cypress_pid # Wait specifically for Cypress to finish
echo $cypress_pid # Print the exit code of Cypress
echo $backend_pid # Print the exit code of the backend
echo $frontend_pid # Print the exit code of the frontend
# Terminate processes
taskkill /pid $backend_pid
taskkill /pid $frontend_pid