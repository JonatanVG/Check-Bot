FROM python:3.13-slim

WORKDIR /bot

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY main.py .
COPY src/ ./src/

RUN adduser --disabled-password --gecos "" botuser

RUN chown -R botuser:botuser /bot

USER botuser

EXPOSE 8000

CMD ["python", "main.py"]