export default function SubHero({
  watermark,
  variant = 'default',
  children,
  breadcrumb,
}) {
  return (
    <section className="ui-section ui-section--light">
      <div
        className={`ui-subHero ${variant ? `ui-subHero--${variant}` : ''}`}
        data-watermark={watermark}
      >
        {children}

        {breadcrumb && (
          <div className="ui-subHero__breadcrumb ui-container">
            {breadcrumb}
          </div>
        )}
      </div>
    </section>
  );
}
