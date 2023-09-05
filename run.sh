cd backend
sudo docker build -t backend-test .
cd ..
cd frontend
sudo docker build -t frontend-test .
cd ..
sudo docker compose up
echo Start Seeding Test Data
sleep 2
cd testData
pip install psycopg2
python3 dataSeeding.py
echo Data Seeding Finished
cd ..
