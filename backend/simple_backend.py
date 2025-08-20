"""
Simple test backend for ECG Classification PWA
Minimal version for testing without complex dependencies
"""
import json
import time
from typing import Dict, Any
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse, parse_qs
import threading

class ECGTestHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """Handle CORS preflight"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        """Handle GET requests"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path == '/api/v1/status':
            self.send_json_response({
                "status": "operational",
                "ai_available": True,
                "version": "1.0.0-test",
                "capabilities": [
                    "ECG File Upload (CSV, TXT, DAT)",
                    "Demo ECG Analysis",
                    "Test Mode Active"
                ]
            })
        elif parsed_path.path == '/api/v1/demo-files':
            self.send_json_response({
                "demo_files": [
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
            })
        elif parsed_path.path == '/api/v1/cardiac-conditions':
            self.send_json_response({
                "conditions": {
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
                    }
                }
            })
        elif parsed_path.path == '/health':
            self.send_json_response({
                "status": "healthy",
                "ai_service": "test_mode",
                "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S")
            })
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_POST(self):
        """Handle POST requests"""
        parsed_path = urlparse(self.path)
        
        if parsed_path.path.startswith('/api/v1/analyze-demo/'):
            demo_id = parsed_path.path.split('/')[-1]
            time.sleep(2)  # Simulate processing time
            
            # Mock analysis results
            mock_results = {
                "normal_sinus_rhythm": {
                    "success": True,
                    "diagnosis": "Normal Sinus Rhythm",
                    "confidence": 94.2,
                    "features": {
                        "estimated_heart_rate": 72.5,
                        "rhythm_regularity": 0.89,
                        "signal_to_noise_ratio": 8.7,
                        "amplitude_range": 1.34,
                        "signal_complexity": 0.67,
                        "dominant_frequency": 1.2,
                        "spectral_centroid": 2.1,
                        "baseline_wander": 0.03
                    }
                },
                "atrial_fibrillation": {
                    "success": True,
                    "diagnosis": "Atrial Fibrillation", 
                    "confidence": 89.1,
                    "features": {
                        "estimated_heart_rate": 98.3,
                        "rhythm_regularity": 0.34,
                        "signal_to_noise_ratio": 6.2,
                        "amplitude_range": 0.89,
                        "signal_complexity": 1.23,
                        "dominant_frequency": 1.8,
                        "spectral_centroid": 3.4,
                        "baseline_wander": 0.08
                    }
                },
                "myocardial_infarction": {
                    "success": True,
                    "diagnosis": "Myocardial Infarction",
                    "confidence": 91.7,
                    "features": {
                        "estimated_heart_rate": 85.1,
                        "rhythm_regularity": 0.76,
                        "signal_to_noise_ratio": 5.9,
                        "amplitude_range": 0.52,
                        "signal_complexity": 1.89,
                        "dominant_frequency": 0.9,
                        "spectral_centroid": 1.8,
                        "baseline_wander": 0.12
                    }
                }
            }
            
            result = mock_results.get(demo_id, {
                "success": False,
                "error": f"Demo file '{demo_id}' not found"
            })
            
            self.send_json_response(result)
            
        elif parsed_path.path == '/api/v1/classify-ecg':
            # Mock file upload analysis
            time.sleep(3)  # Simulate processing time
            
            self.send_json_response({
                "success": True,
                "diagnosis": "Normal Sinus Rhythm",
                "confidence": 87.5,
                "features": {
                    "estimated_heart_rate": 75.2,
                    "rhythm_regularity": 0.82,
                    "signal_to_noise_ratio": 7.3,
                    "amplitude_range": 1.12,
                    "signal_complexity": 0.74,
                    "dominant_frequency": 1.1,
                    "spectral_centroid": 2.3,
                    "baseline_wander": 0.05
                }
            })
        else:
            self.send_response(404)
            self.end_headers()
    
    def send_json_response(self, data: Dict[str, Any]):
        """Send JSON response with CORS headers"""
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
        
        json_data = json.dumps(data, indent=2)
        self.wfile.write(json_data.encode('utf-8'))
    
    def log_message(self, format, *args):
        """Override to reduce noise"""
        print(f"[{time.strftime('%H:%M:%S')}] {format % args}")

def start_test_server():
    """Start the test server"""
    server = HTTPServer(('localhost', 8000), ECGTestHandler)
    print("=" * 60)
    print("ECG Classification PWA - Test Backend")
    print("=" * 60)
    print("* Test server starting on http://localhost:8000")
    print("* API Documentation: http://localhost:8000/api/v1/status")
    print("* Health Check: http://localhost:8000/health")
    print("* Demo Analysis: Available")
    print("=" * 60)
    print("Note: This is a test backend with mock AI responses")
    print("Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n* Test server stopped")
        server.shutdown()

if __name__ == "__main__":
    start_test_server()