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
   uv venv
   source .venv/bin/activate
   ```

3. Set up Supabase:
   - Create a Supabase account and project.
   - Get the API URL and API Key from the Supabase project settings.
   - Create a `.env` file in the `backend` directory and add the following:

     ```
     SUPABASE_URL=<your-supabase-url>
     SUPABASE_KEY=<your-supabase-key>
     ```

4. Deploy the backend service to AWS Lambda:
   - Create an AWS account if you don't have one.
   - Install the AWS CLI and configure it with your credentials.
   - Package the backend code and dependencies:

     ```bash
     cd backend
     pip install -r requirements.txt -t .
     zip -r9 ../deployment-package.zip .
     ```

   - Create a Lambda function in the AWS Management Console and upload the deployment package.
   - Set the handler to `lambda_function.lambda_handler`.

5. Set up CloudWatch to trigger the Lambda function:
   - Go to the CloudWatch console.
   - Create a new rule to trigger the Lambda function once a day.

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

## Accessing the Frontend Application

Once the frontend application is running, you can access it by navigating to `http://localhost:5000` in your web browser.
