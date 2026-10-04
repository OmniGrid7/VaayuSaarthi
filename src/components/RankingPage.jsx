import { rankingData } from '../data.js';

export default function RankingPage({ t }) {
  return (
    <section id="ranking">
      <div className="ranking-label-btn" id="aqi-bulletin">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4caf50" strokeWidth="2.5" aria-hidden="true">
          <path d="M18 20V10M12 20V4M6 20v-6" />
        </svg>
        <span>{t('rankingTitle', 'AQI ranking · sample snapshot: Delhi NCR')}</span>
      </div>
      <div className="ranking-card">
        <table className="ranking-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{t('city', 'City')}</th>
              <th>AQI</th>
              <th>{t('status', 'Status')}</th>
              <th>{t('trend', 'Trend')}</th>
              <th>{t('updated', 'Updated')}</th>
            </tr>
          </thead>
          <tbody>
            {rankingData.map((row, index) => (
              <tr key={row.city}>
                <td><span className="rank-num">{index + 1}</span></td>
                <td><div className="rank-city">{row.city}</div><div className="rank-state">{row.state}</div></td>
                <td><span className={`aqi-pill ${row.bg}`}>{row.aqi}</span></td>
                <td>{row.status}</td>
                <td><span className={row.tc}>{row.trend}</span></td>
                <td className="ranking-updated">{row.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}