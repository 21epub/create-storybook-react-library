'use strict'

const test = require('ava')
const execa = require('execa')
const path = require('path')
const rmfr = require('rmfr')

const createLibrary = require('./create-library')

const fixtures = [
  {
    name: 'my-test-library',
    author: '21epub',
    description: 'this is an auto-generated test module. please ignore.',
    repo: '21epub/my-test-library',
    license: 'MIT',
    manager: 'npm',
    template: 'storybook-ts-react',
    git: true
  },
  {
    name: 'my-test-library',
    author: '21epub',
    description: 'this is an auto-generated test module. please ignore.',
    repo: '21epub/my-test-library',
    license: 'MIT',
    manager: 'npm',
    template: 'storybook-ts-antd',
    git: true
  }
  // {
  //   name: 'my-test-library',
  //   author: 'nala',
  //   description: 'this is an auto-generated test module. please ignore.',
  //   repo: 'nala/my-test-library',
  //   license: 'MIT',
  //   manager: 'npm',
  //   template: 'default',
  //   git: true
  // },
  // {
  //   name: 'my-test-library',
  //   author: 'nala',
  //   description: 'this is an auto-generated test module. please ignore.',
  //   repo: 'nala/my-test-typescript-library',
  //   license: 'MIT',
  //   manager: 'npm',
  //   template: 'typescript',
  //   git: true
  // },
  // {
  //   name: '@automagical/nala',
  //   author: 'superstar-cats',
  //   description: 'this is an auto-generated test module. please ignore.',
  //   repo: 'superstar-cats/nala',
  //   license: 'GPL',
  //   manager: 'yarn',
  //   template: 'default',
  //   git: true
  // },
  // {
  //   name: 'no-git-library',
  //   author: 'nala',
  //   description: 'this is an auto-generated test module. please ignore.',
  //   repo: 'nala/no-git-library',
  //   license: 'MIT',
  //   manager: 'yarn',
  //   template: 'default',
  //   git: false
  // },
  // {
  //   name: 'my-custom-template',
  //   author: 'nala',
  //   description: 'this is an auto-generated test module. please ignore.',
  //   repo: 'nala/my-custom-template',
  //   license: 'GPL',
  //   manager: 'yarn',
  //   template: 'custom',
  //   templatePath: './template/default',
  //   git: true
  // }
]

fixtures.forEach((fixture, index) => {
  test.serial(
    `${index}) creating "${fixture.name}" using ${fixture.manager}`,
    async (t) => {
      console.log(`creating "${fixture.name}" using ${fixture.manager}...`)
      t.timeout(10 * 60 * 1000)
      let ret

      // ret = await execa("git", ["config", "user.email", "test@example.com"], {
      //   cwd: root,
      // });
      // t.is(ret.exitCode, 0);
      // ret = await execa("git", ["config", "user.name", "test"], { cwd: root });
      // t.is(ret.exitCode, 0);

      // ensure library is created successfully
      const root = await createLibrary(fixture)
      // const example = path.join(root, 'example')
      t.truthy(root.indexOf(fixture.shortName) >= 0)

      // ensure deps install successfully in root
      ret = await execa(fixture.manager, ['install'], { cwd: root })
      t.is(ret.exitCode, 0)

      // ensure peers deps install successfully in root
      // ret = await execa(fixture.manager, ['run', 'install-peers'], {
      //   cwd: root
      // })
      // t.is(ret.exitCode, 0)

      // ensure root tests pass
      // ret = await execa.shell(`${fixture.manager} test`, { cwd: root })
      // t.is(ret.exitCode, 0)

      // ensure bundle builds successfully
      ret = await execa(fixture.manager, ['build'], { cwd: root })
      t.is(ret.exitCode, 0)

      // ensure storybook builds successfully in example
      // ret = await execa(fixture.manager, ['run', 'build-prod'], { cwd: root })
      // t.is(ret.exitCode, 0)

      // ensure git is initialized properly
      ret = await execa('git', ['rev-parse', '--git-dir'], { cwd: root })
      t.is(ret.stdout, fixture.git ? '.git' : path.join(process.cwd(), '.git'))

      await rmfr(root)
    }
  )
})
