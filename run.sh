docker compose up -d
echo Start Seeding Test Data
sleep 2
cd testData
python3 dataSeeding.py
echo Data Seeding Finished
cd ..