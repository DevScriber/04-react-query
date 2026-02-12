import ReactPaginateOrigin from 'react-paginate';
import type { ComponentType } from 'react';
import type { ReactPaginateProps } from 'react-paginate';

const ReactPaginate = (
  (ReactPaginateOrigin as unknown as { default: ComponentType<ReactPaginateProps> }).default || 
  ReactPaginateOrigin
) as ComponentType<ReactPaginateProps>;

export default ReactPaginate;