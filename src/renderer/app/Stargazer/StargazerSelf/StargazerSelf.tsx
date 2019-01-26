import { themeConfig } from '@/renderer/infrastructure/styles/Theme';
import { formatRoute, Routes } from '@/renderer/Routes';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';

import { RepositoryList } from '@/renderer/elements/RepositoryList';
import { UserProfile } from '@/renderer/elements/UserProfile';
import { SettingsStore } from '@/renderer/store/Settings/Store';
import {
  AddUserToStargazerListAction,
  AddUserToStargazerListActionType,
} from '@/renderer/store/Stargazer/actions/AddUserToStargazerListAction';
import { StargazerStore } from '@/renderer/store/Stargazer/Store';
import styled from 'styled-components';

interface Props {
  settings: SettingsStore;
  stargazer: StargazerStore;
  AddUserToStargazerListAction: AddUserToStargazerListActionType;
}

class StargazerSelf extends React.Component<Props> {
  get user() {
    if (this.props.settings.github
      && this.props.settings.github.user
      && this.props.settings.github.user.user) {
      return this.props.settings.github.user.user;
    }
    return false;
  }

  get login() {
    return this.user && this.user.attributes.login ? this.user.attributes.login : false;
  }

  componentDidMount(): void {
    if (this.login) {
      this.props.AddUserToStargazerListAction(this.login);
    }
  }

  get repositoryList() {
    if (
      this.login
      && this.props.stargazer.list[this.login]
      && this.props.stargazer.list[this.login].stargazerRepositoryList
    ) {
      return this.props.stargazer.list[this.login].stargazerRepositoryList;
    }

    return [];
  }

  render() {
    if (!this.user) {
      return <Redirect to={formatRoute(Routes.STARGAZER)} />;
    }

    return <>
      <UserContainer>
        <UserProfile user={this.user} />
      </UserContainer>
      <RepositoryList repositoryList={ this.repositoryList }
      />
    </>;
  }
}

const UserContainer = styled.div`
  width: 100%;
  background-color: ${themeConfig.colors.white}
`;

function mapStateToProps(state) {
  return {
    settings: state.settings,
    stargazer: state.stargazer,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      AddUserToStargazerListAction,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(StargazerSelf);
