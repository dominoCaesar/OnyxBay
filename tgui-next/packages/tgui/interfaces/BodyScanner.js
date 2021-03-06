import { Fragment } from "inferno";
import { NoticeBox, Section, Tabs, ProgressBar, Button, Table, Flex, Box } from '../components';
import { LabeledList } from "../components/LabeledList";
import { act } from "../byond";

export const BodyScanner = props => {
  const { state } = props;
  const { config, data } = state;
  const { ref } = config;

  if (data.medical_data) {
    return (
      <Fragment>
        {data.connected
          ? <Section title={'Scan Results'}>
            <LabeledList>

              <LabeledList.Item label="Name">
                {data.medical_data.object}
              </LabeledList.Item>

              <LabeledList.Item label="Date">
                {data.medical_data.scan_date}
              </LabeledList.Item>

              <LabeledList.Item label="Actions">
                <Button icon="print" onClick={() => act(ref, 'print', null)} content="Print Scan" />
                <Button icon="eject" onClick={() => act(ref, 'eject', null)} content="Eject" />
              </LabeledList.Item>

            </LabeledList>

            <Section title="Warnings" level={2}>
              {data.medical_data.warnings.length
                ? data.medical_data.warnings.map(warning => {
                  return (
                    <NoticeBox>
                      {warning}
                    </NoticeBox>
                  ); })
                : "Nothing"
              }
            </Section>

            <Section title="Body" level={2} buttons={
              data.hide_status
                ? <Button content="Show" icon="eye"
                  onClick={() => act(ref, 'toggle_status', null)} />
                : <Button content="Hide" icon="eye-slash"
                  onClick={() => act(ref, 'toggle_status', null)} />
            }>
              {data.hide_status
                ? null
                : <Fragment>
                  <Section title="Common" level={3}>
                    <LabeledList>

                      <LabeledList.Item label="Pulse">
                        {data.medical_data.pulse >= 0
                          ? data.medical_data.pulse + " BPM"
                          : "Nonstandard biology"
                        }
                      </LabeledList.Item>

                      <LabeledList.Item label="Body Temperature">
                        {data.medical_data.body_temperature_c} ℃ ({data.medical_data.body_temperature_f} ℉)
                      </LabeledList.Item>

                      <LabeledList.Item label="Brain Activity">
                        {data.medical_data.brain_activity >= 0
                          ? <ProgressBar value={data.medical_data.brain_activity}
                            ranges={{
                              good: [0.8, 1.0],
                              average: [0.5, 0.8],
                              bad: [0.0, 0.5],
                            }} />
                          : "Nonstandard biology"
                        }
                      </LabeledList.Item>

                      <LabeledList.Item label="Immunity">
                        <ProgressBar value={data.medical_data.immunity}
                          ranges={{
                            good: [0.8, 2.0],
                            average: [0.5, 0.8],
                            bad: [0.0, 0.5],
                          }} />
                      </LabeledList.Item>

                    </LabeledList>
                  </Section>

                  <Section title="Blood" level={3}>
                    <LabeledList>
                      <LabeledList.Item label="Blood Type">
                        {data.medical_data.blood_type
                          ? data.medical_data.blood_type
                          : 'Unknown'
                        }
                      </LabeledList.Item>

                      <LabeledList.Item label="Blood Pressure">
                        {data.medical_data.blood_pressure}
                      </LabeledList.Item>

                      <LabeledList.Item label="Blood Volume">
                        <ProgressBar value={data.medical_data.blood_volume / 100}
                          // eslint-disable-next-line max-len
                          content={data.medical_data.blood_volume_abs + '/' + data.medical_data.blood_volume_max + 'u (' + data.medical_data.blood_volume + '%)'}
                          ranges={{
                            good: [0.8, 1.0],
                            average: [0.5, 0.8],
                            bad: [0.0, 0.5],
                          }} />
                      </LabeledList.Item>

                      <LabeledList.Item label="Blood Oxygenation">
                        <ProgressBar value={data.medical_data.blood_oxygenation / 100}
                          ranges={{
                            good: [0.8, 1.0],
                            average: [0.5, 0.8],
                            bad: [0.0, 0.5],
                          }} />
                      </LabeledList.Item>

                    </LabeledList>
                  </Section>

                  <Section title="Defects" level={2}>
                    <LabeledList>
                      <LabeledList.Item label="Physical Trauma"
                        color={data.medical_data.brute_severity === 'None'
                          ? 'good'
                          : (data.medical_data.brute_severity === 'Severe' ? 'bad' : 'average')} >
                        {data.medical_data.brute_severity}
                      </LabeledList.Item>

                      <LabeledList.Item label="Burn Severity"
                        color={data.medical_data.burn_severity === 'None'
                          ? 'good'
                          : (data.medical_data.burn_severity === 'Severe' ? 'bad' : 'average')} >
                        {data.medical_data.burn_severity}
                      </LabeledList.Item>

                      <LabeledList.Item label="Systematic Organ Failure"
                        color={data.medical_data.tox_severity === 'None'
                          ? 'good'
                          : (data.medical_data.tox_severity === 'Severe' ? 'bad' : 'average')} >
                        {data.medical_data.tox_severity}
                      </LabeledList.Item>

                      <LabeledList.Item label="Oxygen Deprivation"
                        color={data.medical_data.oxy_severity === 'None'
                          ? 'good'
                          : (data.medical_data.oxy_severity === 'Severe' ? 'bad' : 'average')} >
                        {data.medical_data.oxy_severity}
                      </LabeledList.Item>

                      <LabeledList.Item label="Radiation Level"
                        color={data.medical_data.rad_severity === 'None'
                          ? 'good'
                          : (data.medical_data.rad_severity === 'Severe' ? 'bad' : 'average')} >
                        {data.medical_data.rad_severity}
                      </LabeledList.Item>

                      <LabeledList.Item label="Genetic Tissue Damage"
                        color={data.medical_data.clone_severity === 'None'
                          ? 'good'
                          : (data.medical_data.clone_severity === 'Severe' ? 'bad' : 'average')} >
                        {data.medical_data.clone_severity}
                      </LabeledList.Item>
                    </LabeledList>
                  </Section>
                </Fragment>
              }
            </Section>

            <Section title="Organs" level={2}
              buttons={
                data.hide_organs
                  ? <Button content="Show" icon="eye"
                    onClick={() => act(ref, 'toggle_organs', null)} />
                  : <Button content="Hide" icon="eye-slash"
                    onClick={() => act(ref, 'toggle_organs', null)} />
              }>
              {data.hide_organs
                ? null
                : <Fragment>
                  <Section title="External" level={3}>
                    <Table>
                      <Table.Row>
                        <Table.Cell bold>
                        Organ
                          <hr/>
                        </Table.Cell>
                        <Table.Cell bold>
                        Damage
                          <hr/>
                        </Table.Cell>
                        <Table.Cell bold>
                        Status
                          <hr/>
                        </Table.Cell>
                      </Table.Row>

                      {data.medical_data.external_organs.map(organ => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              {organ.name}
                              <hr/>
                            </Table.Cell>
                            <Table.Cell color={organ.damage[0] === 'None' ? 'good' : 'bad'}>
                              {organ.damage.map(organ_damage => {
                                return (
                                  <Fragment>
                                    {organ_damage + '\n'}
                                    <hr/>
                                  </Fragment>
                                );
                              })}
                            </Table.Cell>
                            <Table.Cell color={organ.status[0] === '' ? 'good' : 'bad'}>
                              {organ.status.map(organ_status => {
                                return (
                                  <Fragment>
                                    {organ_status === ''
                                      ? 'Good'
                                      : organ_status}
                                    <hr/>
                                  </Fragment>
                                );
                              })}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table>
                  </Section>

                  <Section title="Internal" level={3}>
                    <Table>
                      <Table.Row>
                        <Table.Cell bold>
                        Organ
                          <hr/>
                        </Table.Cell>
                        <Table.Cell bold>
                        Damage
                          <hr/>
                        </Table.Cell>
                        <Table.Cell bold>
                        Status
                          <hr/>
                        </Table.Cell>
                      </Table.Row>

                      {data.medical_data.internal_organs.map(organ => {
                        return (
                          <Table.Row>
                            <Table.Cell>
                              {organ.name}
                              <hr/>
                            </Table.Cell>
                            <Table.Cell color={organ.damage[0] === 'None' ? 'good' : 'bad'}>
                              {organ.damage.map(organ_damage => {
                                return (
                                  <Fragment>
                                    {organ_damage + '\n'}
                                    <hr/>
                                  </Fragment>
                                );
                              })}
                            </Table.Cell>
                            <Table.Cell color={organ.status[0] === '' ? 'good' : 'bad'}>
                              {organ.status.map(organ_status => {
                                return (
                                  <Fragment>
                                    {organ_status === ''
                                      ? 'Good'
                                      : organ_status}
                                    <hr/>
                                  </Fragment>
                                );
                              })}
                            </Table.Cell>
                          </Table.Row>
                        );
                      })}
                    </Table>
                  </Section>

                </Fragment>
              }
            </Section>
          </Section>

          : <NoticeBox>
        Error: No Body Scanner connected.
          </NoticeBox>
        }
      </Fragment>
    );
  } else {
    return (
      <NoticeBox>
        Body Scanner is empty.
      </NoticeBox>
    );
  }
};
