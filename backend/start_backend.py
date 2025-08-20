"""
Backend startup script for ECG Classification PWA
Ensures proper environment setup and AI service availability
"""
import os
import sys
import subprocess
from pathlib import Path
import logging

def setup_logging():
    """Configure logging for backend startup"""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    return logging.getLogger(__name__)

def check_dependencies():
    """Check if all required dependencies are installed"""
    logger = logging.getLogger(__name__)
    
    required_packages = [
        'fastapi',
        'uvicorn',
        'pandas',
        'numpy',
        'scikit-learn',
        'wfdb',
        'scipy'
    ]
    
    missing_packages = []
    
    for package in required_packages:
        try:
            __import__(package)
            logger.info(f"✓ {package} is available")
        except ImportError:
            missing_packages.append(package)
            logger.error(f"✗ {package} is missing")
    
    if missing_packages:
        logger.error(f"Missing packages: {missing_packages}")
        logger.info("Install with: pip install -r requirements.txt")
        return False
    
    return True

def check_ai_service():
    """Check if AI service from original ECG system is accessible"""
    logger = logging.getLogger(__name__)
    
    # Add ECG system path
    ecg_system_path = Path(__file__).parent.parent.parent / "ecg-classification-system-main" / "ecg-classification-system-main"
    
    if not ecg_system_path.exists():
        logger.error(f"ECG system not found at: {ecg_system_path}")
        logger.info("Please ensure the original ECG system is available")
        return False
    
    sys.path.append(str(ecg_system_path))
    
    try:
        from app.utils.real_ai_predictor import RealECGPredictor
        predictor = RealECGPredictor()
        logger.info("✓ AI service is available")
        return True
    except ImportError as e:
        logger.error(f"✗ AI service import failed: {e}")
        return False

def start_server():
    """Start the FastAPI server"""
    logger = logging.getLogger(__name__)
    
    logger.info("Starting ECG Classification API server...")
    
    try:
        import uvicorn
        uvicorn.run(
            "main:app",
            host="0.0.0.0",
            port=8000,
            reload=True,
            log_level="info",
            access_log=True
        )
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server startup failed: {e}")
        return False
    
    return True

def main():
    """Main startup function"""
    logger = setup_logging()
    
    logger.info("=" * 60)
    logger.info("ECG Classification PWA - Backend Startup")
    logger.info("=" * 60)
    
    # Check Python version
    python_version = sys.version_info
    logger.info(f"Python version: {python_version.major}.{python_version.minor}.{python_version.micro}")
    
    if python_version < (3, 8):
        logger.error("Python 3.8 or higher required")
        return False
    
    # Check dependencies
    logger.info("Checking dependencies...")
    if not check_dependencies():
        logger.error("Dependency check failed")
        return False
    
    # Check AI service
    logger.info("Checking AI service...")
    ai_available = check_ai_service()
    
    if ai_available:
        logger.info("✓ Full AI functionality available")
    else:
        logger.warning("⚠ AI service limited - some features may not work")
        logger.info("Backend will start in limited mode")
    
    # Start server
    logger.info("=" * 60)
    logger.info("Starting API server on http://localhost:8000")
    logger.info("API Documentation: http://localhost:8000/api/docs")
    logger.info("Health Check: http://localhost:8000/health")
    logger.info("=" * 60)
    
    return start_server()

if __name__ == "__main__":
    success = main()
    if not success:
        sys.exit(1)