import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import MenuList, { useCreateOrUpdateMenu, useFetchMenus } from '..';

const mockUseFetchMenus = useFetchMenus as jest.Mock<any>;
const mockUseCreateOrUpdateMenu = useCreateOrUpdateMenu as jest.Mock<any>;

jest.mock('../menu-api');

describe('MenuComponent', () => {
  beforeEach(() => {
    mockUseFetchMenus.mockImplementation(() => ({
      isLoading: true,
      data: {
        data: [
          {
            label: 'Testlabel',
            icon: 'Testicon',
            separator: 'Testseparator',
            routerLink: 'TestrouterLink',
          },
        ],
      },
      isError: false,
    }));

    mockUseCreateOrUpdateMenu.mockImplementation(() => ({
      mutate: jest.fn(() => {}),
      isError: false,
    }));
  });

  test('Should Render List', () => {
    render(<MenuList />);
    const labelElement = screen.getByText(/Testlabel/i);
    expect(labelElement).toBeInTheDocument();
    const iconElement = screen.getByText(/Testicon/i);
    expect(iconElement).toBeInTheDocument();
    const separatorElement = screen.getByText(/Testseparator/i);
    expect(separatorElement).toBeInTheDocument();
    const routerLinkElement = screen.getByText(/TestrouterLink/i);
    expect(routerLinkElement).toBeInTheDocument();
  });

  test('Should Open Create/Update Popup', () => {
    render(<MenuList />);
    fireEvent.click(screen.getByTestId('btn-create'));
    expect(screen.getByTestId(/create-update-dialog/i)).toBeInTheDocument();
    expect(screen.getByTestId(/parents/i)).toBeInTheDocument();
  });

  test('Should Not Be Modified', () => {
    const tree = renderer.create(<MenuList />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
