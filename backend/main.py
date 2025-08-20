"""
FastAPI Backend for ECG Classification PWA
Preserves exact AI logic from Streamlit system
"""
import os
import sys
import asyncio
from pathlib import Path
from typing import List, Dict, Any, Optional
import logging

from fastapi import FastAPI, File, UploadFile, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd
import numpy as np
from pydantic import BaseModel

# Add the ECG system to path to import exact AI logic
ecg_system_path = Path(__file__).parent.parent.parent / "ecg-classification-system-main" / "ecg-classification-system-main"
sys.path.append(str(ecg_system_path))

# Import EXACT AI predictor (zero modifications)
try:
    from app.utils.real_ai_predictor import RealECGPredictor, analyze_ecg_file
    AI_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import AI predictor: {e}")
    AI_AVAILABLE = False

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# FastAPI app configuration
app = FastAPI(
    title="ECG Classification API",
    description="Professional ECG Classification System - Backend API preserving exact AI logic",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS configuration for PWA
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],  # Add production domains
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Pydantic models for API
class ECGAnalysisRequest(BaseModel):
    file_content: str
    filename: str
    file_type: str

class ECGAnalysisResponse(BaseModel):
    success: bool
    diagnosis: Optional[str] = None
    confidence: Optional[float] = None
    features: Optional[Dict[str, Any]] = None
    error: Optional[str] = None

class SystemStatusResponse(BaseModel):
    status: str
    ai_available: bool
    version: str
    capabilities: List[str]

# WebSocket connection manager for real-time progress
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_progress(self, websocket: WebSocket, progress: Dict[str, Any]):
        try:
            await websocket.send_json(progress)
        except:
            # Connection closed
            pass

manager = ConnectionManager()

# API Routes

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "ECG Classification API",
        "version": "1.0.0",
        "ai_available": AI_AVAILABLE,
        "docs": "/api/docs"
    }

@app.get("/api/v1/status", response_model=SystemStatusResponse)
async def get_system_status():
    """Get system status and capabilities"""
    capabilities = [
        "ECG File Upload (CSV, TXT, DAT)",
        "Real AI Classification",
        "Demo ECG Analysis",
        "Batch Processing",
        "Clinical Reference Database"
    ]
    
    if not AI_AVAILABLE:
        capabilities = ["System Health Check", "File Upload", "Basic Validation"]
    
    return SystemStatusResponse(
        status="operational" if AI_AVAILABLE else "limited",
        ai_available=AI_AVAILABLE,
        version="1.0.0",
        capabilities=capabilities
    )

@app.post("/api/v1/classify-ecg", response_model=ECGAnalysisResponse)
async def classify_ecg(file: UploadFile = File(...)):
    """
    Main ECG classification endpoint
    Uses EXACT AI logic from Streamlit system
    """
    if not AI_AVAILABLE:
        raise HTTPException(
            status_code=503, 
            detail="AI classification service not available"
        )
    
    try:
        # Validate file
        if not file.filename:
            raise HTTPException(status_code=400, detail="No filename provided")
        
        # Read file content
        content = await file.read()
        
        # Save temporary file for processing
        temp_file = Path("/tmp") / f"temp_{file.filename}"
        temp_file.parent.mkdir(exist_ok=True)
        
        with open(temp_file, "wb") as f:
            f.write(content)
        
        # Process with EXACT AI logic
        try:
            # Read ECG data
            if file.filename.endswith('.csv'):
                ecg_data = pd.read_csv(temp_file)
            elif file.filename.endswith('.txt'):
                ecg_data = pd.read_csv(temp_file, delimiter='\t')
            else:
                # Try CSV first
                try:
                    ecg_data = pd.read_csv(temp_file)
                except:
                    ecg_data = pd.read_csv(temp_file, delimiter='\t')
            
            # Validate and process ECG data (same logic as Streamlit)
            processed_ecg = validate_and_process_ecg_data(ecg_data, file.filename)
            
            if processed_ecg is None:
                raise HTTPException(
                    status_code=400,
                    detail="Invalid ECG data format"
                )
            
            # Use EXACT AI predictor
            predictor = RealECGPredictor()
            results = predictor.analyze_demo_ecg(processed_ecg)
            
            # Clean up temp file
            if temp_file.exists():
                temp_file.unlink()
            
            return ECGAnalysisResponse(
                success=results['success'],
                diagnosis=results.get('diagnosis'),
                confidence=results.get('confidence'),
                features=results.get('features'),
                error=results.get('error')
            )
            
        except Exception as e:
            # Clean up temp file
            if temp_file.exists():
                temp_file.unlink()
            
            logger.error(f"AI processing error: {str(e)}")
            return ECGAnalysisResponse(
                success=False,
                error=f"AI processing failed: {str(e)}"
            )
            
    except Exception as e:
        logger.error(f"File processing error: {str(e)}")
        raise HTTPException(
            status_code=400,
            detail=f"File processing failed: {str(e)}"
        )

@app.get("/api/v1/demo-files")
async def get_demo_files():
    """Get available demo ECG files"""
    demo_files = [
        {
            "id": "normal_sinus_rhythm",
            "name": "Normal Heart Rhythm",
            "filename": "normal_sinus_rhythm.csv",
            "description": "Normal sinus rhythm - healthy heart pattern",
            "expected_diagnosis": "Normal Sinus Rhythm",
            "expected_confidence": 94
        },
        {
            "id": "atrial_fibrillation", 
            "name": "Atrial Fibrillation",
            "filename": "atrial_fibrillation.csv",
            "description": "Irregular heart rhythm - atrial fibrillation pattern",
            "expected_diagnosis": "Atrial Fibrillation",
            "expected_confidence": 89
        },
        {
            "id": "myocardial_infarction",
            "name": "Heart Attack Pattern", 
            "filename": "myocardial_infarction.csv",
            "description": "Myocardial infarction - heart attack pattern",
            "expected_diagnosis": "Myocardial Infarction",
            "expected_confidence": 91
        }
    ]
    
    return {"demo_files": demo_files}

@app.post("/api/v1/analyze-demo/{demo_id}", response_model=ECGAnalysisResponse)
async def analyze_demo_file(demo_id: str):
    """Analyze a demo ECG file using exact AI logic"""
    if not AI_AVAILABLE:
        raise HTTPException(
            status_code=503,
            detail="AI classification service not available"
        )
    
    # Map demo IDs to filenames
    demo_files = {
        "normal_sinus_rhythm": "normal_sinus_rhythm.csv",
        "atrial_fibrillation": "atrial_fibrillation.csv", 
        "myocardial_infarction": "myocardial_infarction.csv"
    }
    
    if demo_id not in demo_files:
        raise HTTPException(status_code=404, detail="Demo file not found")
    
    filename = demo_files[demo_id]
    demo_file_path = ecg_system_path / "data" / "samples" / filename
    
    if not demo_file_path.exists():
        raise HTTPException(
            status_code=404,
            detail=f"Demo file not found: {filename}"
        )
    
    try:
        # Use exact AI analysis logic
        results = analyze_ecg_file(str(demo_file_path))
        
        return ECGAnalysisResponse(
            success=results['success'],
            diagnosis=results.get('diagnosis'),
            confidence=results.get('confidence'),
            features=results.get('features'),
            error=results.get('error')
        )
        
    except Exception as e:
        logger.error(f"Demo analysis error: {str(e)}")
        return ECGAnalysisResponse(
            success=False,
            error=f"Demo analysis failed: {str(e)}"
        )

@app.get("/api/v1/cardiac-conditions")
async def get_cardiac_conditions():
    """Get clinical reference database of cardiac conditions"""
    conditions = {
        'NORM': {
            'name': 'Normal Sinus Rhythm',
            'description': 'Regular, healthy heart rhythm with normal electrical conduction',
            'priority': 'LOW',
            'clinical_significance': 'No immediate medical concern'
        },
        'AFIB': {
            'name': 'Atrial Fibrillation',
            'description': 'Irregular heart rhythm where atria are not beating in coordination',
            'priority': 'HIGH', 
            'clinical_significance': 'May require anticoagulation therapy and rate control'
        },
        'MI': {
            'name': 'Myocardial Infarction',
            'description': 'Heart attack - part of heart muscle damaged due to lack of blood flow',
            'priority': 'CRITICAL',
            'clinical_significance': 'Requires immediate emergency medical attention'
        },
        'STTC': {
            'name': 'ST-T Changes',
            'description': 'Abnormal ST segment or T wave changes indicating ischemia',
            'priority': 'MEDIUM',
            'clinical_significance': 'Requires evaluation for coronary artery disease'
        },
        'CD': {
            'name': 'Conduction Disorder',
            'description': 'Abnormal electrical conduction through the heart',
            'priority': 'MEDIUM',
            'clinical_significance': 'May require monitoring or pacemaker therapy'
        }
    }
    
    return {"conditions": conditions}

@app.websocket("/ws/analysis-progress")
async def websocket_analysis_progress(websocket: WebSocket):
    """WebSocket endpoint for real-time analysis progress"""
    await manager.connect(websocket)
    try:
        while True:
            # Keep connection alive
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)

# Utility functions (preserving exact Streamlit logic)

def validate_and_process_ecg_data(data: pd.DataFrame, filename: str) -> Optional[pd.DataFrame]:
    """
    Validate and process ECG data using EXACT logic from Streamlit system
    """
    try:
        # Check for common ECG column names (exact same logic)
        columns = data.columns.str.lower()
        
        time_col = None
        signal_col = None
        
        # Find time column
        for col in ['time', 't', 'timestamp', 'sample']:
            if col in columns:
                time_col = data.columns[columns.tolist().index(col)]
                break
        
        # Find signal column  
        for col in ['ecg_signal', 'ecg', 'signal', 'amplitude', 'v1', 'lead_i', 'lead_ii']:
            if col in columns:
                signal_col = data.columns[columns.tolist().index(col)]
                break
        
        if time_col is None:
            # Generate time column if not present
            time_data = np.arange(len(data)) / 500  # Assume 500 Hz
        else:
            time_data = data[time_col].values
        
        if signal_col is None:
            # Try first numeric column
            numeric_cols = data.select_dtypes(include=[np.number]).columns
            if len(numeric_cols) > 0:
                signal_col = numeric_cols[0]
            else:
                return None
        
        signal_data = data[signal_col].values
        
        # Create standardized ECG data (exact same format)
        ecg_data = pd.DataFrame({
            'time': time_data,
            'ecg_signal': signal_data
        })
        
        # Basic validation (exact same logic)
        if len(ecg_data) < 100:
            logger.warning(f"Very short ECG recording ({len(ecg_data)} samples)")
        
        if len(ecg_data) > 50000:
            # Take first 10 seconds worth of data
            max_time = ecg_data['time'].iloc[0] + 10
            ecg_data = ecg_data[ecg_data['time'] <= max_time]
        
        return ecg_data
        
    except Exception as e:
        logger.error(f"Error validating ECG file {filename}: {str(e)}")
        return None

# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint for deployment monitoring"""
    return {
        "status": "healthy",
        "ai_service": "available" if AI_AVAILABLE else "unavailable",
        "timestamp": pd.Timestamp.now().isoformat()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )