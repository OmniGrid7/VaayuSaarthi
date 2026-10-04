export default function AtmospherePage({ t }) {
  return (
    <section className="atmosphere-section">
      <div className="section-heading-row atmosphere-heading">
        <div>
          <p className="eyebrow">{t('weatherChemistry', 'WEATHER × CHEMISTRY')}</p>
          <h2>{t('shapingAir', 'What is shaping the air')}</h2>
          <p className="section-description">{t('weatherDescription', 'Meteorological context and transport signals for the current scenario.')}</p>
        </div>
        <span className="scenario-tag">Scenario indicators · sample data</span>
      </div>
      <div className="atmosphere-grid">
        <article className="conditions-panel">
          <h3>{t('boundaryLayer', 'Boundary-layer conditions')}</h3>
          <div className="condition-grid">
            <div className="condition-item"><span>{t('temperature', 'Temperature')}</span><strong>18.4°<small>C</small></strong><em>{t('coolMorning', 'Cool morning')}</em></div>
            <div className="condition-item"><span>{t('windSpeed', 'Wind speed')}</span><strong>7.2<small> km/h</small></strong><em>{t('northwesterly', 'North-westerly')}</em></div>
            <div className="condition-item"><span>{t('pblHeight', 'PBL height')}</span><strong>420<small> m</small></strong><em>{t('lowDispersion', 'Low dispersion')}</em></div>
            <div className="condition-item"><span>{t('humidity', 'Relative humidity')}</span><strong>71<small>%</small></strong><em>{t('elevated', 'Elevated')}</em></div>
          </div>
          <div className="inversion-panel">
            <div className="inversion-heading">
              <span>{t('inversionStrength', 'Thermal inversion strength')}</span>
              <strong>{t('moderate', 'Moderate')} <b>+4.8°C</b></strong>
            </div>
            <div className="inversion-scale"><span /></div>
            <p>{t('inversionDescription', 'Stable air near the surface can slow pollutant mixing and keep concentrations elevated.')}</p>
          </div>
        </article>

        <article className="plume-panel">
          <div className="plume-topline"><span className="plume-icon" aria-hidden="true">↘</span><span>{t('upwind', 'UPWIND TRANSPORT')}</span></div>
          <h3>{t('plumeTitle', 'Stubble-burning plume')}</h3>
          <p className="plume-risk"><span />{t('transportPotential', 'Elevated transport potential')}</p>
          <div className="plume-route"><span>Punjab · northwest</span><span className="route-dashes" /><strong>Delhi NCR</strong></div>
          <div className="plume-details"><span>Wind corridor<strong>NW → SE</strong></span><span>Arrival window<strong>Next 12–24 h</strong></span></div>
          <p className="plume-disclaimer">{t('plumeDisclaimer', 'Illustrative scenario only. Fire detections and plume transport are not connected to live satellite or weather feeds.')}</p>
        </article>
      </div>
      <div className="feedback-note">
        <span className="feedback-mark" aria-hidden="true">↗</span>
        <div>
          <strong>{t('feedbackTitle', 'Aerosol–radiation feedback')}</strong>
          <p>{t('feedbackDescription', 'In a coupled model, particle loading dims surface sunlight, which can cool the surface and suppress boundary-layer growth. This dashboard currently displays scenario indicators only; no two-way WRF-Chem simulation is connected.')}</p>
        </div>
        <span className="feedback-state">{t('notCoupled', 'Not coupled')}</span>
      </div>
    </section>
  );
}