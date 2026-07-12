import { Grid } from '@material-ui/core';
import {
  Header,
  Page,
  Content,
  ContentHeader,
  SupportButton,
} from '@backstage/core-components';
import { ElasticQueryRunnerComponent } from '../ElasticQueryRunnerComponent';

export const HomeComponent = () => (
  <Page themeId="tool">
    <Header title="Welcome to elastic-devtool!" 
      subtitle="Run and manage Elasticsearch queries inside Backstage">
      {/* <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" /> */}
    </Header>
    <Content>
      <ContentHeader title="Elastic Devtool">
        <SupportButton>This plugin embeds Elastic Devtools directly into Backstage, allowing developers to write, test, and execute Elasticsearch queries without leaving the platform. It streamlines troubleshooting and boosts productivity by centralizing Elasticsearch interactions within the developer portal.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <ElasticQueryRunnerComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);
