import { theme } from '@/infrastructure/styles/theme';
import * as React from 'react';
import styled from 'styled-components';

import { UnstyledList } from '@/app/elements/base';
import { FrequencyType } from '@/models/Frequency.type';

interface Props {
  frequency: FrequencyType;
  handleSetFrequency: (frequency: FrequencyType) => void;
}

interface State {
  frequency: FrequencyType;
}

const List = styled(UnstyledList)`
  display: flex;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const ListItem = styled.li`
  margin-right: 1rem;
  &:last-child {
    margin-right: 0;
  }
`;

const Label = styled.button`
  background-color: ${theme.colors.white};
  border-radius: 999px;
  border: 2px solid ${theme.colors.white};
  font-size: 0.8rem;
  color: ${theme.colors.black};
  &:active, &:hover, &.selected {
    outline: none;
    text-decoration: underline;
  }
`;

export class FrequencyPicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.handleSetFrequency = this.handleSetFrequency.bind(this);
    this.state = {
      frequency: props.frequency,
    };
  }

  handleSetFrequency(frequency: FrequencyType) {
    this.setState({ frequency }, () => this.props.handleSetFrequency(frequency));
  }

  get list() {
    return ['daily', 'weekly', 'monthly', 'yearly'].map((frequency: FrequencyType) => {
      const frequencyTitleCase = frequency.replace(/^\w/, (c) => c.toUpperCase());
      const selectedClass = this.props.frequency === frequency ? 'selected' : null;
      return <ListItem key={frequency}>
        <Label id={`select-${frequency}`} className={selectedClass} onClick={() => this.handleSetFrequency(frequency)}>
          {frequencyTitleCase}
        </Label>
      </ListItem>;
    });
  }

  render() {
    return (
      <List id='frequency-list'>
        {this.list}
      </List>
    );
  }
}
