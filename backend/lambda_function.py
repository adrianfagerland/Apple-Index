from backend.main import scheduled_job

def lambda_handler(event, context):
    scheduled_job()
