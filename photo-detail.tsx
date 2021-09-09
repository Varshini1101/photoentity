import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './photo.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const PhotoDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const photoEntity = useAppSelector(state => state.photo.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="photoDetailsHeading">
          <Translate contentKey="simplifyMarketplaceApp.photo.detail.title">Photo</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{photoEntity.id}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="simplifyMarketplaceApp.photo.name">Name</Translate>
            </span>
          </dt>
          <dd>{photoEntity.name}</dd>
          <dt>
            <span id="mimetype">
              <Translate contentKey="simplifyMarketplaceApp.photo.mimetype">Mimetype</Translate>
            </span>
          </dt>
          <dd>{photoEntity.mimetype}</dd>
          <dt>
            <span id="pic">
              <Translate contentKey="simplifyMarketplaceApp.photo.pic">Pic</Translate>
            </span>
          </dt>
          <dd>
            {photoEntity.pic ? (
              <div>
                {photoEntity.picContentType ? (
                  <a onClick={openFile(photoEntity.picContentType, photoEntity.pic)}>
                    <img src={`data:${photoEntity.picContentType};base64,${photoEntity.pic}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {photoEntity.picContentType}, {byteSize(photoEntity.pic)}
                </span>
              </div>
            ) : null}
          </dd>
        </dl>
        <Button tag={Link} to="/photo" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/photo/${photoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default PhotoDetail;
