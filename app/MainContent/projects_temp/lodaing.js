import CircularProgress from '@mui/material/CircularProgress';
export default function LoadingProjects() {
  return (
    <div className="flex justify-center items-center">
      <h1><CircularProgress /></h1>
    </div>
  );
}
