import Grid from '../components/Grid'
export default function Row ({row_idx,row_vector}) {
      return (
        <tr>
          {row_vector.map((element, index) => {
            return(
              <Grid key={index} value={element} grid_id={'grid-'+row_idx+'-'+index} value_id={'value-'+row_idx+'-'+index}/>
            )
          })}
        </tr>
    );
};