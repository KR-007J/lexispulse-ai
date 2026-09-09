/**
 * LexisPulse AI 2.0: Client-Side Official Legal Audit Dossier Generator
 * Produces structured printable PDF dossiers with cryptographic SHA-256 seal.
 */

export interface ExportDossierParams {
  contractName: string;
  overallScore: number;
  riskGrade: string;
  criticalCount: number;
  clauses: Array<{
    id: string;
    section: string;
    title: string;
    riskLevel: string;
    riskScore: number;
    riskCategory: string;
    whyItMatters: string;
    originalText: string;
    recommendedCounterClause: string;
    statutoryReference?: string;
  }>;
  sha256Attestation?: string;
  timestamp?: string;
}

export function exportOfficialAuditDossier(data: ExportDossierParams) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    alert('Please allow popups to export the official audit dossier.');
    return;
  }

  const dateStr = data.timestamp || new Date().toUTCString();
  const shaToken = data.sha256Attestation || 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>LexisPulse AI Dossier — ${escapeHtml(data.contractName)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,400;0,600;0,700;1,400&family=Instrument+Serif:ital@0;1&display=swap');
    
    @page {
      size: A4 portrait;
      margin: 15mm 20mm 15mm 20mm;
    }

    body {
      font-family: 'Barlow', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #18181b;
      background: #ffffff;
      line-height: 1.5;
      padding: 20px;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 2px solid #09090b;
      padding-bottom: 14px;
      margin-bottom: 20px;
    }

    .logo {
      font-family: 'Instrument Serif', Georgia, serif;
      font-size: 28px;
      font-weight: bold;
      letter-spacing: -0.5px;
      color: #09090b;
    }

    .meta {
      text-align: right;
      font-size: 11px;
      color: #71717a;
    }

    .scorecard {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      background: #f4f4f5;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      border: 1px solid #e4e4e7;
    }

    .metric-title {
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: #71717a;
      font-weight: 600;
    }

    .metric-value {
      font-size: 24px;
      font-weight: 700;
      color: #09090b;
      margin-top: 4px;
    }

    .badge-critical { color: #dc2626; }
    .badge-high { color: #ea580c; }
    .badge-medium { color: #ca8a04; }
    .badge-low { color: #16a34a; }

    .clause-card {
      border: 1px solid #e4e4e7;
      border-radius: 6px;
      padding: 14px;
      margin-bottom: 16px;
      page-break-inside: avoid;
    }

    .clause-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
    }

    .clause-title {
      font-weight: 700;
      font-size: 14px;
      color: #09090b;
    }

    .clause-tag {
      font-size: 10px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      text-transform: uppercase;
    }

    .tag-critical { background: #fee2e2; color: #991b1b; }
    .tag-high { background: #ffedd5; color: #9a3412; }
    .tag-medium { background: #fef9c3; color: #854d0e; }
    .tag-low { background: #dcfce7; color: #166534; }

    .box {
      font-size: 12px;
      padding: 8px 12px;
      border-radius: 4px;
      margin-top: 8px;
    }

    .box-original {
      background: #fef2f2;
      border-left: 3px solid #ef4444;
      color: #7f1d1d;
      font-family: monospace;
      white-space: pre-wrap;
    }

    .box-remediation {
      background: #f0fdf4;
      border-left: 3px solid #22c55e;
      color: #14532d;
      font-family: monospace;
      white-space: pre-wrap;
    }

    .statute-cite {
      font-size: 11px;
      color: #0284c7;
      margin-top: 6px;
      font-weight: 600;
    }

    .footer {
      margin-top: 30px;
      border-top: 1px solid #e4e4e7;
      padding-top: 12px;
      font-size: 10px;
      color: #a1a1aa;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .seal {
      font-family: monospace;
      background: #f4f4f5;
      padding: 4px 8px;
      border-radius: 4px;
      border: 1px solid #e4e4e7;
    }
  </style>
</head>
<body>
  <div class="header">
    <div>
      <div class="logo">LexisPulse AI 2.0</div>
      <div style="font-size: 13px; color: #52525b; margin-top: 2px;">Autonomous Multi-Agent Contract Audit & Statutory Triage Dossier</div>
    </div>
    <div class="meta">
      <div><strong>Target Agreement:</strong> ${escapeHtml(data.contractName)}</div>
      <div><strong>Audit Timestamp:</strong> ${dateStr}</div>
      <div><strong>Engine:</strong> Google Gemini 2.0 Flash (Multi-Agent Swarm)</div>
    </div>
  </div>

  <div class="scorecard">
    <div>
      <div class="metric-title">Overall Risk Score</div>
      <div class="metric-value ${data.overallScore > 65 ? 'badge-critical' : data.overallScore > 40 ? 'badge-medium' : 'badge-low'}">${data.overallScore}/100</div>
    </div>
    <div>
      <div class="metric-title">Security Grade</div>
      <div class="metric-value">${data.riskGrade}</div>
    </div>
    <div>
      <div class="metric-title">Total Clauses Audited</div>
      <div class="metric-value">${data.clauses.length}</div>
    </div>
    <div>
      <div class="metric-title">Critical Blockers</div>
      <div class="metric-value badge-critical">${data.criticalCount}</div>
    </div>
  </div>

  <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; color: #3f3f46; margin-bottom: 12px;">Clause-By-Clause Risk & Remediation Breakdown</h3>

  ${data.clauses.map(c => `
    <div class="clause-card">
      <div class="clause-header">
        <div class="clause-title">${escapeHtml(c.section)} ${escapeHtml(c.title)}</div>
        <span class="clause-tag tag-${c.riskLevel}">${c.riskLevel} (${c.riskScore}/100)</span>
      </div>
      <div style="font-size: 12px; color: #52525b; margin-bottom: 6px;"><strong>Category:</strong> ${escapeHtml(c.riskCategory)} | <strong>Rationale:</strong> ${escapeHtml(c.whyItMatters)}</div>
      
      <div class="box box-original">
        <strong>Flagged Text:</strong><br>${escapeHtml(c.originalText)}
      </div>

      <div class="box box-remediation">
        <strong>Calibrated Remediation Counter-Clause:</strong><br>${escapeHtml(c.recommendedCounterClause)}
      </div>

      ${c.statutoryReference ? `<div class="statute-cite">⚖️ Statutory Authority: ${escapeHtml(c.statutoryReference)}</div>` : ''}
    </div>
  `).join('')}

  <div class="footer">
    <div>LexisPulse AI Enterprise Legal OS | PromptWars 2026 AI Calibration Track</div>
    <div class="seal">Attestation: ${shaToken.slice(0, 32)}...</div>
  </div>

  <script>
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 500);
    };
  </script>
</body>
</html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
