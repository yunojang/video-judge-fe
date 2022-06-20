import { TextInput } from '@wizrnd/nx-ui';
import { FormEvent, useState } from 'react';

interface PostFormProps {
  onSubmit: (title: string) => void;
}

const PostForm = ({ onSubmit }: PostFormProps) => {
  const [title, setTitle] = useState('');

  const onSubmitForm = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(title);
  };

  return (
    <form style={{ marginBottom: '1em' }} onSubmit={onSubmitForm}>
      <TextInput
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Add Posting"
        fullWidth
      />
    </form>
  );
};

export default PostForm;
