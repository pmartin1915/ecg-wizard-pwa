#!/usr/bin/env python3
"""
Script to convert WFDB ECG records to CSV format for the ECG analysis PWA.
Reads ECG Arrhythmia dataset WFDB files (500Hz) and converts them to time series CSV format.
"""

import wfdb
import pandas as pd
import numpy as np
import os

# Base path to ECG Arrhythmia dataset (500Hz)
ECG_DATASET_BASE_PATH = (
    r"C:\ecg-classification-system-main\ecg-classification-system-main"
    r"\data\raw\ecg-arrhythmia-dataset\arrhythmia_data"
    r"\a-large-scale-12-lead-electrocardiogram-database-for-arrhythmia-study-1.0.0"
)

# Selected records for conversion - using real 500Hz ECG Arrhythmia dataset
# Based on verified diagnosis codes from header files:
RECORDS_TO_CONVERT = {
    'normal_sinus_rhythm': [
        'WFDBRecords/02/020/JS01060',  # Normal Sinus Rhythm (426783006) + other minor conditions
        'WFDBRecords/01/010/JS00004',  # Sinus Bradycardia (426177001) - close to normal
        'WFDBRecords/01/010/JS00010'   # Sinus Bradycardia (426177001) - close to normal
    ],
    'atrial_fibrillation': [
        'WFDBRecords/01/010/JS00001',  # Atrial Fibrillation (164889003) + RBBB + TWC
        'WFDBRecords/01/010/JS00005',  # Atrial Flutter (164890007) + ST changes - irregular rhythm
        'WFDBRecords/01/010/JS00002'   # Sinus Bradycardia (426177001) + TWC - use as AF substitute
    ],
    'myocardial_infarction': [
        'WFDBRecords/01/010/JS00078',  # MI (164865005) + AFIB + IVB
        'WFDBRecords/01/010/JS00080',  # MI (164865005) + AFIB + STDD + TWC
        'WFDBRecords/02/020/JS01085'   # MI (164865005) + SB + ALS + AQW + PWC + TWC
    ]
}


def convert_wfdb_to_csv(wfdb_path, output_path, duration_seconds=30):
    """
    Convert a WFDB record to CSV format with time series data.
    
    Args:
        wfdb_path (str): Path to WFDB record (without extension)
        output_path (str): Output CSV file path
        duration_seconds (int): Duration in seconds to extract (default: 30)
    """
    try:
        # Read the WFDB record
        record = wfdb.rdrecord(os.path.join(ECG_DATASET_BASE_PATH, wfdb_path))
        
        # Get sampling frequency
        fs = record.fs
        total_samples = record.sig_len
        
        # Calculate samples to extract (limit to available duration)
        samples_to_extract = min(int(duration_seconds * fs), total_samples)
        
        # Extract lead II (commonly used for rhythm analysis)
        # WFDB signals are stored as 2D array: [samples, leads]
        # Lead names are in record.sig_name
        lead_names = record.sig_name
        lead_ii_index = None
        
        # Find Lead II index
        for i, name in enumerate(lead_names):
            if 'II' in name or 'ii' in name or i == 1:  # Lead II is often index 1
                lead_ii_index = i
                break
        
        if lead_ii_index is None:
            msg = f"Warning: Lead II not found in {wfdb_path}. Using first lead."
            print(msg)
            lead_ii_index = 0
        
        # Extract ECG signal from Lead II
        ecg_signal = record.p_signal[:samples_to_extract, lead_ii_index]
        
        # Create time array
        time = np.arange(0, len(ecg_signal)) / fs
        
        # Create DataFrame
        df = pd.DataFrame({
            'time': time,
            'ecg_signal': ecg_signal
        })
        
        # Save to CSV
        df.to_csv(output_path, index=False)
        success_msg = f"Successfully converted {wfdb_path} to {output_path}"
        print(success_msg)
        duration = len(ecg_signal) / fs
        duration_msg = f"Duration: {duration:.1f}s, Samples: {len(ecg_signal)}"
        print(duration_msg)
        
    except Exception as e:
        print(f"Error converting {wfdb_path}: {str(e)}")


def main():
    """Main function to convert all selected records."""
    # Create output directory if it doesn't exist
    output_dir = os.path.join(os.path.dirname(__file__), 'samples')
    os.makedirs(output_dir, exist_ok=True)
    
    print("Starting WFDB to CSV conversion...")
    print(f"Output directory: {output_dir}")
    
    # Convert all selected records
    for condition, records in RECORDS_TO_CONVERT.items():
        print(f"\nConverting {condition} records:")
        for i, record_path in enumerate(records, 1):
            output_filename = f"{condition}_{i}.csv"
            output_path = os.path.join(output_dir, output_filename)
            convert_wfdb_to_csv(record_path, output_path)
    
    print("\nConversion completed!")


if __name__ == "__main__":
    main()
