import React, { Fragment } from 'react';
import { useCarState, useCarDispatch } from '../../state/services/context';
import { getCars, deleteCar, getEmployee } from '../../state/services/actions';
import useAsyncDataFetch from './Hooks/useAsyncDataFetch';

const CarList = () => {
  const { cars, ssr, employee } = useCarState();
  const dispatch = useCarDispatch();

  const { isLoading } = useAsyncDataFetch(
    { promiseFn: getCars, dispatch },
    ssr
  );
  const { isLoading: isLoadingEmp } = useAsyncDataFetch(
    { promiseFn: getEmployee, dispatch },
    ssr
  );

  const removeCar = id => {
    deleteCar({ dispatch, id });
  };

  const refresh = () => {
    getCars({ dispatch });
  };

  if (isLoading || isLoadingEmp) return <Fragment>Loading...</Fragment>;

  return (
    <div className="car">
      <div className="title">Text</div>

      <div className="employee-list" data-testid="employee-list">
        {employee.map(u => {
          return (
            <span className="employee" key={u.id}>
              {u.name}
            </span>
          );
        })}
      </div>

      <div className="title">Text</div>

      <button className="btn" onClick={refresh}>
        Refresh
      </button>

      <div className="car-list" data-testid="car-list">
        {cars.map(car => {
          return (
            <div className="list-content" key={car.name} data-testid="car">
              <div className="cell">
                <a className="btn-select" href={`/cars/${car.id}`}>
                  Select
                </a>
              </div>
              <div className="cell">
                <b>{car.name}</b>
              </div>
              <div className="cell car-color" style={{ background: car.color }}>
                {car.color}
              </div>
              <div className="cell">
                <button
                  data-testid="btn-delete"
                  onClick={() => removeCar(car.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarList;
