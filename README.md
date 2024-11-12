# Apple-Index

## Project Description

Apple-Index is a website that tracks Apple product prices across different regions and displays them in an organized manner. The website automatically updates prices once a day, stores them in a database, and displays them in a nice frontend application.

## Setup Instructions

### Backend

1. Clone the repository:
   ```bash
   git clone https://github.com/adrianfagerland/Apple-Index.git
   cd Apple-Index
   ```

2. Set up a virtual environment and install dependencies:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

3. Set up Supabase:
   - Create a Supabase account and project.
   - Get the API URL and API Key from the Supabase project settings.
   - Create a `.env` file in the `backend` directory and add the following:
     ```
     SUPABASE_URL=<your-supabase-url>
     SUPABASE_KEY=<your-supabase-key>
     ```

4. Run the backend service:
   ```bash
   python backend/main.py
   ```

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the frontend application:
   ```bash
   npm run dev
   ```

## Running the Scraper

The scraper is scheduled to run once a day automatically. However, you can also run it manually:

1. Activate the virtual environment:
   ```bash
   source venv/bin/activate
   ```

2. Run the scraper:
   ```bash
   python backend/scraper.py
   ```

## Accessing the Frontend Application

Once the frontend application is running, you can access it by navigating to `http://localhost:5000` in your web browser.
