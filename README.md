# IntelMapX - Predictive Intelligence Dashboard

## 🚀 Overview

IntelMapX is a geospatial intelligence system designed to maintain continuous tracking even when incoming location data is incomplete or corrupted.

The system detects anomalies in incoming data streams and intelligently reconstructs missing positions using historical movement patterns.

---

## 🧠 Problem Statement

This project is inspired by real-world intelligence challenges where:

* Data arrives fragmented or incomplete
* Systems fail to track movement continuously
* Analysts lose situational awareness

The goal is to **detect broken location data and reconstruct it intelligently** to maintain a continuous operational view.

---

## 💡 Solution Approach

This system combines two key components:

### 1. Interactive Intelligence Dashboard

* Displays geospatial data on a map
* Shows real-time intelligence points
* Hover-based popups for inspection

### 2. Predictive Reconstruction Engine

* Detects missing or invalid coordinates
* Uses previous movement (velocity-based logic)
* Predicts next position when data is incomplete
* Ensures continuous tracking

---

## ⚙️ How It Works

1. User inputs location data (lat/lon)
2. System processes each point:

   * Valid → marked as **REAL**
   * Missing → detected as **ANOMALY**
3. Prediction engine estimates missing values using:

   * Previous coordinates
   * Movement direction
4. Data is visualized on map:

   * 🟢 Real Points
   * 🟡 Predicted Points
   * 🔴 Broken Points

---

## 🗺️ Features

* Interactive geospatial dashboard
* Anomaly detection system
* Velocity-based prediction logic
* Real-time visualization
* Auto-zoom map adjustment
* Input-based testing system

---

## 🛠️ Tech Stack

* **Frontend:** React, Leaflet
* **Backend:** Django, Django REST Framework
* **Map:** OpenStreetMap

---

## 📂 Project Structure

IntelMapX/
│
├── backend/
│   ├── core/
│   ├── urls.py
│   └── views.py
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── MapView.jsx
│   │   └── main.jsx
│
└── README.md

---

## ▶️ Run Locally

### Backend

cd backend
python manage.py runserver

### Frontend

cd client
npm install
npm run dev

---

## 📌 Key Insight

This system ensures that tracking does not break even when data is incomplete — enabling reliable intelligence monitoring.

---

## 👤 Author

Anvi
Focus: AI + Geospatial Systems

---

## 📎 Note

This project demonstrates a simplified predictive intelligence model inspired by real-world fragmented telemetry and intelligence fusion challenges.
