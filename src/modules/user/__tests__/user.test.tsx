import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserList, { useCreateOrUpdateUser, useFetchUsers } from '..';
import { useFetchRoles } from '../../role';
import renderer from 'react-test-renderer';

const mockUseFetchUsers = useFetchUsers as jest.Mock<any>;
const mockUseCreateOrUpdateUser = useCreateOrUpdateUser as jest.Mock<any>;
const mockUseFetchRoles = useFetchRoles as jest.Mock<any>;

jest.mock('../user-api');
jest.mock('../../role/role-api');

describe('UserList', () => {
  beforeEach(() => {
    mockUseFetchUsers.mockImplementation(() => ({
      isLoading: true,
      data: {
        data: [
          {
            firstName: 'TestFirstName',
          },
        ],
      },
      isError: false,
    }));

    mockUseFetchRoles.mockImplementation(() => ({
      isLoading: true,
      data: {
        data: [
          {
            id: 1,
            name: 'roleOne',
          },
        ],
      },
      isError: false,
    }));

    mockUseCreateOrUpdateUser.mockImplementation(() => ({
      mutate: jest.fn(() => {}),
      isError: false,
    }));
  });

  test('Render List of users', () => {
    render(<UserList />);
    const linkElement = screen.getByText(/TestFirstName/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Display Create/Update Popup', () => {
    render(<UserList />);
    fireEvent.click(screen.getByTestId('btn-create'));
    expect(screen.getByTestId(/create-update-dialog/i)).toBeInTheDocument();
    expect(screen.getByTestId(/roles/i)).toBeInTheDocument();
  });

  test('Render Correct', () => {
    const tree = renderer.create(<UserList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
