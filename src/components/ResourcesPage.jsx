export default function ResourcesPage({ t }) {
  return (
    <>
      <header className="dashboard-heading">
        <div>
          <p className="eyebrow">{t('resourcesEyebrow', 'REFERENCE & LIMITATIONS')}</p>
          <h1>{t('resourcesTitle', 'Resources and data notes')}</h1>
          <p className="dashboard-subtitle">{t('resourcesDescription', 'How to interpret the information shown in this prototype.')}</p>
        </div>
      </header>
      <p className="data-note">{t('dataNote', 'Prototype using illustrative values. The linked reference project forecasts PM2.5/PM10 from historical time-series and weather features; operational 72-hour predictions require a validated model, live observations and weather inputs.')}</p>
    </>
  );
}