import {
  Button,
  Card,
  Combobox,
  ComboboxItem,
  DropdownItem,
  Flex,
  Grid,
  Icon,
  IconButton,
  NoResults,
} from '@/components';
import { Input } from '@/components/core/input';
import { Separator } from '@/components/core/separator.styles';
import { MintCardHeader } from '@/views/mint/mint-card';
import { Mint } from '@/views/mint/mint.context';
import React, { forwardRef, useRef, useState } from 'react';

//TODO remove once it's integrated with GH login
const repos = [
  'DyDx',
  'Testing',
  'Hello World',
  'Portofolio',
  'NFA',
  'NFT',
  'NFTs',
];

//TODO remove once it's integrated with GH login
const users: ComboboxItem[] = [
  { label: 'DyDx', value: 'DyDx', icon: 'github' },
  { label: 'Testing', value: 'Testing', icon: 'github' },
  { label: 'Hello World', value: 'Hello World', icon: 'github' },
  { label: 'Portofolio', value: 'Portofolio', icon: 'github' },
  { label: 'NFA', value: 'NFA', icon: 'github' },
  { label: 'NFT', value: 'NFT', icon: 'github' },
  { label: 'NFTs', value: 'NFTs', icon: 'github' },
];

type RepoRowProps = {
  repo: string;
  button: React.ReactNode;
} & React.ComponentProps<typeof Flex>;

export const RepoRow = forwardRef<HTMLDivElement, RepoRowProps>(
  ({ repo, button, ...props }, ref) => (
    <Flex
      {...props}
      ref={ref}
      css={{ justifyContent: 'space-between', my: '$4', ...props.css }}
    >
      <Flex css={{ alignItems: 'center' }}>
        <Icon name="github" css={{ fontSize: '$2xl', mr: '$2' }} />
        <span>{repo}</span>
      </Flex>
      {button}
    </Flex>
  )
);

export const GithubRepositoryConnection: React.FC = () => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<ComboboxItem | undefined>();
  const { setGithubStep, setRepositoryName, setRepositoryConfig } =
    Mint.useContext();

  const timeOutRef = useRef<NodeJS.Timeout>();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    timeOutRef.current && clearTimeout(timeOutRef.current);
    timeOutRef.current = setTimeout(() => {
      setSearchValue(event.target.value);
    }, 500);
  };

  const handlePrevStepClick = () => {
    setGithubStep(1);
  };

  const handleSelectRepo = (repo: string) => {
    setRepositoryName(repo);
    setGithubStep(3);
    setRepositoryConfig({} as DropdownItem, '');
  };

  const filteredRepositories =
    searchValue === ''
      ? repos
      : repos.filter(
          (item) => item.toUpperCase().indexOf(searchValue.toUpperCase()) != -1
        );

  return (
    <Card.Container css={{ maxWidth: '$107h', maxHeight: '$95h', pb: '$0h' }}>
      <MintCardHeader
        title="Select Repository"
        onClickBack={handlePrevStepClick}
      />
      <Card.Body css={{ pt: '$4' }}>
        <Grid css={{ rowGap: '$2' }}>
          <Flex css={{ gap: '$4' }}>
            <Combobox
              items={users}
              selectedValue={selectedUser}
              onChange={setSelectedUser}
            />
            <Input
              leftIcon="search"
              placeholder="Search"
              onChange={handleSearchChange}
            />
          </Flex>
          <Flex
            css={{
              minHeight: '$40',
              maxHeight: '$60',
              overflowX: 'hidden',
              overflowY: 'scroll',
              flexDirection: 'column',
            }}
          >
            {filteredRepositories.length > 0 ? (
              filteredRepositories.map((repo, index, { length }) => (
                <React.Fragment key={repo}>
                  <RepoRow
                    repo={repo}
                    button={
                      <Button
                        colorScheme="blue"
                        variant="outline"
                        css={{ py: '$1', height: '$5', borderRadius: '$md' }}
                        onClick={() => handleSelectRepo(repo)}
                      >
                        Use for NFA
                      </Button>
                    }
                  />
                  {index < length - 1 && <Separator />}
                </React.Fragment>
              ))
            ) : (
              <NoResults css="text-center" />
            )}
          </Flex>
        </Grid>
      </Card.Body>
    </Card.Container>
  );
};
