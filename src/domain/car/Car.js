import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { useCarState, useCarDispatch } from '../../state/services/context';
import { getCar } from '../../state/services/actions';
import useAsyncDataFetch from './Hooks/useAsyncDataFetch';

import './car.scss';

const BtnBack = () => {
  const goBack = () => {
    // force SSR again with location change
    window.location.href = '/';
  };

  return (
    <span className="btn btn-back" onClick={goBack}>
      Go Back
    </span>
  );
};

const Car = ({ match }) => {
  const { params } = match;
  const { id } = params;
  const { car, ssr } = useCarState();
  const dispatch = useCarDispatch();

  const { isLoading } = useAsyncDataFetch(
    { promiseFn: getCar, dispatch },
    ssr,
    { id }
  );

  if (isLoading || !car)
    return (
      <Fragment>
        <BtnBack /> Loading...
      </Fragment>
    );
  return (
    <div className="car">
      <BtnBack />
      <div className="title">Label name</div>

      <div className="subtitle">Label name</div>
      <div className="data">{car.name}</div>

      <div className="subtitle">Label name</div>
      <div className="data">{car.color}</div>

      <div className="title">Label name</div>
      <div className="part-list" data-testid="part-list">
        {car.parts &&
          car.parts.map(u => {
            return (
              <span className="part" key={u.id}>
                {u.name}
              </span>
            );
          })}
      </div>
    </div>
  );
};

Car.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  }).isRequired
};

export default Car;
