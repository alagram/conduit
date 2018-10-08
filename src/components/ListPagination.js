import React from "react";

const ListPagination = props => {
  if (props.articlesCount <= 10) {
    return null;
  }

  const range = [];

  for (let i = 0; i < Math.ceil(props.articlesCount / 10); ++i) {
    range.push(i);
  }

  const setPage = page => props.onSetPage(page);

  return (
    <nav>
      <ul className="pagination">
        {range.map(num => {
          const isCurrent = num === props.currentPage;

          const onClick = env => {
            env.preventDefault();
            setPage(num);
          };

          return (
            <li
              className={isCurrent ? "page-item active" : "page-item"}
              onClick={onClick}
              key={num.toString()}
            >
              <a className="page-link" href="">
                {num + 1}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ListPagination;
