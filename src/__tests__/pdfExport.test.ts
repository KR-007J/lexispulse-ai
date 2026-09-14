import { describe, it, expect, vi } from 'vitest';
import { exportOfficialAuditDossier, ExportDossierParams } from '../utils/pdfExport';
import { SAMPLE_CONTRACTS } from '../data/sampleContracts';

describe('exportOfficialAuditDossier', () => {
  it('handles popup blocker gracefully', () => {
    const originalOpen = window.open;
    const originalAlert = window.alert;
    const alertMock = vi.fn();
    window.open = vi.fn().mockReturnValue(null);
    window.alert = alertMock;

    try {
      const sample = SAMPLE_CONTRACTS[0];
      const params: ExportDossierParams = {
        contractName: sample.name,
        overallScore: sample.overallRiskScore,
        riskGrade: sample.riskGrade,
        criticalCount: sample.criticalIssuesCount,
        clauses: sample.clauses,
      };

      exportOfficialAuditDossier(params);
      expect(alertMock).toHaveBeenCalledWith('Please allow popups to export the official audit dossier.');
    } finally {
      window.open = originalOpen;
      window.alert = originalAlert;
    }
  });

  it('generates dossier HTML with cryptographic seal and clauses', () => {
    const originalOpen = window.open;
    const mockOpenDoc = vi.fn();
    const mockWrite = vi.fn();
    const mockClose = vi.fn();

    window.open = vi.fn().mockReturnValue({
      document: {
        open: mockOpenDoc,
        write: mockWrite,
        close: mockClose,
      },
    });

    try {
      const sample = SAMPLE_CONTRACTS[0];
      const params: ExportDossierParams = {
        contractName: sample.name,
        overallScore: sample.overallRiskScore,
        riskGrade: sample.riskGrade,
        criticalCount: sample.criticalIssuesCount,
        clauses: sample.clauses,
        sha256Attestation: 'sha256:test1234567890abcdef',
        timestamp: 'Mon, 14 Sep 2026 12:00:00 GMT',
      };

      exportOfficialAuditDossier(params);
      expect(mockOpenDoc).toHaveBeenCalled();
      expect(mockWrite).toHaveBeenCalled();
      const generatedHtml = mockWrite.mock.calls[0][0];

      expect(generatedHtml).toContain(sample.name);
      expect(generatedHtml).toContain('sha256:test1234567890abcdef');
      expect(generatedHtml).toContain('AI for Legal Assistance & Access');
      expect(generatedHtml).toContain('window.print()');
      expect(mockClose).toHaveBeenCalled();
    } finally {
      window.open = originalOpen;
    }
  });
});
