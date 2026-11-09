import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PostComments from '.';

it('insere dois comentários e mantém a ordem de publicação', () => {
    render(<PostComments />);
    const input = screen.getByTestId('comment-input');
    const submit = screen.getByRole('button', { name: 'Comentar' });
    const list = screen.getByTestId('comment-list');

    expect(within(list).queryAllByRole('listitem')).toHaveLength(0);

    const messages = ['Gostei da publicação!', 'Obrigado por compartilhar.'];
    for (const message of messages) {
        userEvent.type(input, message);
        userEvent.click(submit);
        expect(input).toHaveValue('');
    }

    const comments = within(list).getAllByRole('listitem');
    expect(comments.map(comment => comment.textContent)).toEqual(messages);
});
