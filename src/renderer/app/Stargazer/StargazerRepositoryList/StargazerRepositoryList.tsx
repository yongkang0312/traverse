import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';

import {
  EmptyStargazerRepositoryList,
} from '@/renderer/app/Stargazer/StargazerRepositoryList/components/EmptyStargazerRepositoryList';
import { Icon } from '@/renderer/app/TrendingRepos/components/LanguageListPicker';
import { RepositoryList } from '@/renderer/elements/RepositoryList';
import { themeConfig } from '@/renderer/infrastructure/styles/Theme';
import { formatRoute, Routes } from '@/renderer/Routes';
import {
  AddUserToStargazerListAction,
  AddUserToStargazerListActionType,
} from '@/renderer/store/Stargazer/actions/AddUserToStargazerListAction';
import { StargazerStore } from '@/renderer/store/Stargazer/Store';

interface Props {
  history: any;
  stargazer: StargazerStore;
  AddUserToStargazerListAction: AddUserToStargazerListActionType;
  ClearCurrentStargazerAction: () => void;
}

class StargazerRepositoryList extends React.Component<Props> {
  readonly iconPin = require('@/assets/icons/icon-pin.svg');
  readonly iconClose = require('@/assets/icons/icon-close-circle.svg');

  constructor(props: Props) {
    super(props);
    this.handleStargazerClick = this.handleStargazerClick.bind(this);
    this.handleStargazerPin = this.handleStargazerPin.bind(this);
    this.handleStargazerClear = this.handleStargazerClear.bind(this);
  }

  handleStargazerClick(login: string) {
    this.props.AddUserToStargazerListAction(login);
    this.props.history.push(formatRoute(Routes.STARGAZER_DETAIL, { login }));
  }

  handleStargazerPin() {
    this.props.AddUserToStargazerListAction(this.props.stargazer.currentUserLogin);
  }

  handleStargazerClear() {
    this.props.ClearCurrentStargazerAction();
    this.props.history.push(formatRoute(Routes.STARGAZER));
  }

  render() {
    let content = <EmptyStargazerRepositoryList/>;

    if (this.props.stargazer.currentUserLogin) {
      content = <>
        <TitleBar>
          <NavIcon onClick={this.handleStargazerPin}
                title='Add to your stargazer list'
                dangerouslySetInnerHTML={{ __html: this.iconPin }}
          />
          <NavIcon onClick={this.handleStargazerClear}
                title='Add to your stargazer list'
                dangerouslySetInnerHTML={{ __html: this.iconClose }}
          />
        </TitleBar>
        <ScrollView>
          <RepositoryList
            repositoryList={this.props.stargazer.list[this.props.stargazer.currentUserLogin].stargazerRepositoryList}
            handleStargazerClick={this.handleStargazerClick}
            emptyRepositoryList={<EmptyStargazerRepositoryList/>}
          />
        </ScrollView>
      </>;
    }

    return <>
      <Close onClick={this.handleStargazerClear}>
        Close
      </Close>
      <StargazerDetail>{content}</StargazerDetail>
    </>;
  }
}

const ScrollView = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
`;

const NavIcon = styled(Icon)`
  & svg {
    cursor: pointer;
  }
  &:hover .primary {
    fill: ${themeConfig.colors['green-darker']};
  }
  &:hover .secondary {
    fill: ${themeConfig.colors.green};
  }
`;

const TitleBar = styled.div`
  background-color: ${themeConfig.colors.purple};
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 1rem;
`;

const Close = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${themeConfig.colors.white};
  top: ${themeConfig.sizes.topbarHeight}px;
  left: 0;
  bottom: ${themeConfig.sizes.bottomNavHeight}px;
  background-color: ${themeConfig.colors['grey-darker']};
  right: calc(100% - ${themeConfig.sizes.sidebarWidth}px);
`;

const StargazerDetail = styled.div`
  position: absolute;
  top: ${themeConfig.sizes.topbarHeight}px;
  bottom: ${themeConfig.sizes.bottomNavHeight}px;
  right: 0;
  left: ${themeConfig.sizes.sidebarWidth}px;
  background-color: rgba(255, 255, 255, 0.98);
  overflow-y: auto;
`;

function mapStateToProps(state) {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(StargazerRepositoryList);
