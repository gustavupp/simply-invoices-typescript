import React, { useContext } from 'react'
import { AppContext } from '../Context'

const Pagination: React.FC = (): JSX.Element => {
  const {
    getInvoices,
    amountOfPages,
    setCurrentPage,
    currentPage,
    setIsPaginationLoading,
    userInfo: { userId },
  } = useContext(AppContext)

  //pagination logic
  const handleClick = (index: number) => {
    if (index === currentPage) return
    setIsPaginationLoading(true)
    if (userId) {
      return getInvoices(userId, index).then(() => setCurrentPage(index))
    }
  }

  return (
    <div className="d-flex flex-column align-items-center">
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li
            className={
              currentPage + 1 !== 1 ? 'page-item' : 'page-item disabled'
            }
            onClick={() =>
              currentPage + 1 > 1 ? handleClick(currentPage - 1) : null
            }
          >
            <button className="page-link bg-dark" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </button>
          </li>

          {Array.from({ length: amountOfPages }).map((_, index) => {
            return (
              <li
                className={
                  currentPage === index ? 'page-item active' : 'page-item'
                }
                key={index}
              >
                <button
                  className="page-link text-white bg-dark"
                  onClick={() => handleClick(index)}
                >
                  {index + 1}
                </button>
              </li>
            )
          })}
          <li
            className={
              currentPage + 1 < amountOfPages
                ? 'page-item'
                : 'page-item disabled'
            }
            onClick={() =>
              currentPage + 1 < amountOfPages
                ? handleClick(currentPage + 1)
                : null
            }
          >
            <button className="page-link bg-dark" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span className="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
