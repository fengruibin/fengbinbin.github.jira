import React from 'react';
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from '../../utils';
import { useProjects } from 'utils/project';
import { useUsers } from "utils/user";
import { ButtonNoPadding, Row, ErrorBox, ScreenContainer } from 'components/lib';
import {
  useProjectModal,
  useProjectsSearchParams,
} from "screens/project-list/util";
import { Profiler } from 'components/profiler';

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false);

  const { open } = useProjectModal();

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers();

  return (
    <Profiler id={'项目列表'}>
      <ScreenContainer>
        <Row marginBottom={2} between={true}>
          <h1>项目列表</h1>
          <ButtonNoPadding
            onClick={open}
            type={'link'}>
            创建项目
          </ButtonNoPadding>
        </Row>
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        <ErrorBox error={error} />
        <List dataSource={list || []} users={users || []} loading={isLoading} />
      </ScreenContainer>
    </Profiler>
  )
}

ProjectListScreen.whyDidYouRender = false
