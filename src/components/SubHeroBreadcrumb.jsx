import { ChevronRight } from 'react-feather';
import { Link } from 'react-router-dom';

export default function SubHeroBreadcrumb({ items }) {
  return (
    <nav className="ui-breadcrumb">
      {items.map((item, i) => (
        <span
          key={i}
          className="ui-breadcrumb__group d-flex align-items-center"
        >
          {item.current ? (
            <span className="ui-breadcrumb__item is-current">{item.label}</span>
          ) : (
            <Link className="ui-breadcrumb__item" to={item.to}>
              {item.label}
            </Link>
          )}

          {/* 不是最後一個才顯示 chevron */}
          {i < items.length - 1 && (
            <ChevronRight className="ui-breadcrumb__separator ms-2" size={20} />
          )}
        </span>
      ))}
    </nav>
  );
}
