FROM python:3.9-slim

# Installi ffmpeg bach tkhdem l'conversion
RUN apt-get update && apt-get install -y ffmpeg

WORKDIR /app

# Installi les libraries dyal Python
COPY requirements.txt .
RUN pip install -r requirements.txt
RUN pip install gunicorn

COPY . .

# Khdem l'app b gunicorn w nzidou l'w9t (timeout) bach download yakhed ra7to
CMD ["gunicorn", "app:app", "-b", "0.0.0.0:10000", "--timeout", "120"]
