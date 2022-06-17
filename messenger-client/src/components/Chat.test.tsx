import { render } from "@testing-library/react";
import Chat from "./Chat";

describe('Chat Component', () => {
  const username: string = 'John';
  const room: string = 'DevTeam';

  test('render check', () => {
    const { container } =  render(<Chat username={username} room={room} />);

    expect(container.firstChild).toHaveClass('chat-container');
  });

})